import {db} from './app'

const Post = {}

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

Post.uploadNewPost = async () => {
    const clientData = {
        title: "Nuevo post ejemplo",
        content: "Soy un nuevo post",
        favorite: true,
        type: 1,
    }

    let result = {
        message: '',
        ok: true,
    }

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

    const post = {
        title: clientData.title,
        content: clientData.content,
        favorite: clientData.favorite,
        type: clientData.type,
        posted: new Date().toISOString(),
    }

    try {
        const newPost = await db.collection('post').add(post);
        console.log("New post id: ", newPost.id);
        let result = {
            ok: true,
            message: "El post publicó exitosamente",
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

export default Post;