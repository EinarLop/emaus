import {firebase, db, storage} from './app'

/* ------ CRUD DE BLOG POSTS ------- */

const Post = {};

// CREATE
Post.createNewPost = async (clientData) => {

    const validation = validateClientData(clientData);
    if (!validation.ok) {
        return validation;
    }

    // UPLOAD TO FIRESTORE
    try {
        // DEFINE NEW POST OBJECT
        const post = {
        title: clientData.title,
        content: clientData.content,
        favorite: clientData.favorite || false,
        posted: firebase.firestore.Timestamp.fromDate(new Date()),      // Timestamp is more lightweight than Date
        image: "",    // downloadURL
        }

        const newPost = await db.collection('post').add(post);

        console.log("New post id: ", newPost.id);
        let result = {
            ok: true,
            message: "El post publicó exitosamente",
            id: newPost.id,    // para la URL individual del nuevo post
        }
        return result;

    } catch (err) {
        console.error(err);
        let result = {
            ok: false,
            message: "Algo inesperado sucedió:" + err.message,
        }
        return result;
    }
}

// GET
Post.getAllPosts = async () => {
    try {
    const data = await db.collection('post').orderBy('posted', 'desc').get();

    let posts = [];

    data.forEach(doc => {
        let obj = {
            postId: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            posted: doc.data().posted,
            favorite: doc.data().favorite,
            image: doc.data().image,
        }
        posts.push(obj);
    })

    console.log("Fetched posts succesfully");
    return posts;

    } catch (err) {
        console.error(err);
        return err;
    }
};

Post.getOnePost = async (postId) => {
    try {
        const postRef = await db.collection('post').doc(postId);
        const doc = await postRef.get();
        if (!doc.exists) {
            let result = {
                ok: false,
                message: "No se encontró el Post especificado."
            }
            return result;
        }
        // Todo ok
        let result = {
            ok: true,
            data: doc.data(),
        }
    
        return result;
    } catch (err) {
        console.error(err);
        let result = {
            ok: false,
            message: "API Error:" + err.message,
        }
        return result;
    }
}

Post.getFavoritePosts = async () => {
    const postsCollection = db.collection('post')
    const results = await postsCollection
    .where('favorite', '==', true)
    .get();

    const posts = [];

    if (results.empty) {
    console.log('No hay publicaciones favoritas');
    return posts;
    }
    
    results.forEach(doc => {
        let obj = {
            postId: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            posted: doc.data().posted,
            favorite: doc.data().favorite,
            image: doc.data().image,
        }
        posts.push(obj);
    });

    return posts;
}

// UPDATE
Post.updatePost = async (postId, postData) => {
    // postData should have all object keys defined
    const docRef = db.collection('post').doc(postId);

    if (!postData) {
        let result = {
            message: 'Client Error: no postData received',
            ok: false,
        }
    }

    // postData is an object, firestore only updates the defined fields
    try {

        if (postData.posted !== undefined) {
            postData.posted = firebase.firestore.Timestamp.fromDate(new Date());
        }

        await docRef.update(postData);
        
        let result = {
            message: "El post fue actualizado exitosamente.",
            ok: true,
        }
        
        return result

    } catch (e) {
        console.error(e.message);
        let result = {
            ok: false,
            message: 'API error: ' + e.message,
        }

        return result;
    }
}
    /* For updating nested objects
    const res = await db.collection('users').doc('Frank').update({
    age: 13,
    'favorites.color': 'Red'
    });
    */

// DELETE
Post.deletePost = async (postId) => {
    console.log("deletePost id:", postId, typeof(postId));
    try {
        const postRef = await db.collection("post").doc(postId);
        
        // Delete event image
        const imageUrl = (await postRef.get()).data().image;
        if (imageUrl !== "") {
          let delImg = await Post.deleteImage(postId, imageUrl);
          console.log(imageUrl,"deleted:\n",delImg);
        }
        let res = await postRef.delete();
        console.log("deletePost returned:", res);
        let result = {
            message: "El post se borró exitosamente",
            ok: true,
        }
        return result;

    } catch (err) {
        let result = {
            message: "Error al buscar Post con id"  + postId,
            ok: false,
        }
        return result;
    }
}



// POST IMAGE MANAGEMENT
// Uploads AN IMAGE to blogposts/postId/imageName in Storage
Post.uploadImage = async (postId, imageFile) => {
    // Returns error if any and the image URL from storage
    if (typeof(postId) !== 'string') {
        console.log('API Error: postId is not a String');
        return null;
    };
        
    let storageRef = storage.ref();   // => referencia base de nuestro storage
    let blogpostRef = storageRef.child('blogposts').child(postId);

    try {
        let fileRef = blogpostRef.child(imageFile.name);
        console.log("Storage reference: ", fileRef.fullPath);
        await fileRef.put(imageFile);  
        let url = await fileRef.getDownloadURL();
        console.log("Saved succesfully to Storage.");
        return {error: null, url: url};

    } catch (err) {
        console.error(err);
        return {error: err, url: null};
    }
}

Post.addImageToPost = async (postId, imageFile) => {
    // Get blogpost data
    try {
        const postRef = await db.collection('post').doc(postId); // referencia o apuntador

        const doc = await postRef.get(); // to actually get the data
        
        if (!doc.exists) {
            console.log("API ERROR: Post not found");
            return;
        }
            
        // Delete from storage if existing image
        if (doc.data().image !== "") {
            await Post.deleteImage(postId, doc.data().image);
            console.log("Post id has Existing image. Deleting from storage...")
        }

        // Upload and update the downloadURL
        const {error, url} = await Post.uploadImage(postId, imageFile);

        let imageUrl = url || "";  // if null, default to empty string
        
        await postRef.update({
            image: imageUrl,
        });

        if (error) {
            throw error;
        }

        let result = {
            ok:true,
            message:"Se agregó la imagen al Blog Post con éxito",
        }
        return result;

    } catch (err) {
        // MAX IMAGE SIZE: 2MB
        console.error(err);

        let result = {
            ok:false ,
            message:"Storage error: \n" + err.message,
        }
        return result;
    }

}

Post.deleteImage = async (postId, fileUrl) => {
    console.log("File url", fileUrl);
    try {
        let fileRef = storage.refFromURL(fileUrl);
        console.log("Deleting image: " + fileRef.name);
        await fileRef.delete();
        console.log("Deleted image for post: " + postId)
    } catch (err) {
        console.error(err);
    }
}



const validateClientData = (clientData) => {
    if (clientData === undefined) {
        let result = {
            message: 'Client Error: no Client Data object',
            ok: false,
        }
        return result;
    }

    if (clientData.content === undefined || clientData.title === undefined) {
        let result = {
            message: 'Client Error: Title/Body are undefined',
            ok: false,
        }
        return result;
    }

    try {
        if (clientData.content.trim() === '') {
            let result = {
                message:  "La publicación de blog no debe estar vacía.",
                ok: false,
            }
            return result
        }
    
        if (clientData.title.trim() === '') {
            let result = {
                message:  "El título no debe estar vacío.",
                ok: false,
            }
            return result
        }

        // All is ok
        let result = {
            ok: true,
        }
        return result;
    } catch (err) {
        let result = {
            message:  "Error de Tipado: title o content no son Strings",
            ok: false,
        }
        return result;
    }

}

Post.defaultImage = 'https://firebasestorage.googleapis.com/v0/b/emaus-49818.appspot.com/o/default%2FEmaus_Default.jpg?alt=media&token=5ba32091-4e93-4262-a325-f3a5f3dc9a34';


// https://www.npmjs.com/package/browser-image-compression
// https://firebase.google.com/docs/storage/security

export default Post;