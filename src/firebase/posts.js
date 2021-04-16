import {db} from './app'
import { storage } from './app';

/* Firebase API for managing posts in firestore dataabse */

const Post = {};

Post.getAllPosts = async () => {
    // Fetch all posts from post collection in Firestore.
    try {
    const data = await db
    .collection('post')
    .orderBy('posted', 'desc')
    .get();

    let posts = [];

    data.forEach(doc => {
        let obj = {
            postId: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            posted: doc.data().posted,
            favorite: doc.data().favorite,
            type: doc.data().type,
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

Post.uploadNewPost = async (clientData) => {
    // Upload a new post with data sent from Client
    const ejemplo = {
        title: "Nuevo post ejemplo",
        content: "Soy un nuevo post para borrar",
        favorite: true,
        type: 1,
    }       // ejemplo

    clientData = ejemplo;

    // SANITY CHECKS
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
    } catch (err) {
        let result = {
            message:  "Error de Tipado: title o content no son Strings",
            ok: false,
        }
        return result;
    }

    // DEFINE NEW POST OBJECT
    const post = {
        title: clientData.title,
        content: clientData.content,
        favorite: clientData.favorite || false,
        type: clientData.type || 1,
        posted: new Date().toISOString(),
    }

    // UPLOAD TO FIRESTORE
    try {
        const newPost = await db.collection('post').add(post);
        console.log("New post id: ", newPost.id);
        let result = {
            ok: true,
            message: "El post publicó exitosamente",
            id: newPost.id, 
        }
        return result;

    } catch (err) {
        console.error(err);
        let result = {
            ok: false,
            message: "Algo inesperado sucedió. Por favor intenta de nuevo",
        }
        return result;
    }
}

Post.deletePost = async (postId) => {
    console.log("deletePost id:", postId, typeof(postId));
    try {
        const res = await db.collection('post').doc(postId).delete();
        return {
            message: "Deleted succesfully",
            ok: true,
        }

    } catch (err) {
        let result = {
            message: "Error al buscar Post con id"  + postId,
            ok: false,
        }
        return result;
    }
}

export default Post;


Post.getOnePost = async (postId) => {
    // TODO
}

// Use in conjunction with browser-image-compression
// https://www.npmjs.com/package/browser-image-compression
// https://firebase.google.com/docs/storage/security
Post.uploadImage = async (postId, imageFile) => {
    // Expects to receive a compressed file
    console.log(typeof(postId));
    if (typeof(postId) !== 'string') {
        console.log('API Error: postId is not a String');
        return null;
    };
        
    let storageRef = storage.ref();
    let blogpostRef = storageRef.child('blogposts').child(postId);
    console.log("Storage reference: ", blogpostRef.fullPath);
    console.log("Adding image with name: ", blogpostRef.name);

    try {
        let fileRef = blogpostRef.child(imageFile.name);
        await fileRef.put(imageFile);
        let url = await fileRef.getDownloadURL();
        console.log("Saved succesfully to Storage.");
        return url;

    } catch (err) {
        console.error(err);
        return null;
    }
}

Post.removeImage = async(postId) => {
    // TODO remove the image of given post Id
}