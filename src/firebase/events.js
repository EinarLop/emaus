import {firebase, db, storage} from './app'

const Event = {};

Event.creatNewEvent = async (clientData) => {
    // Todo create an event
    // const date2 = new Date('1995-12-17T03:24:00');
    const ejemplo = {
        title: "NUEVO EVENTO",
        content: "Soy un nuevo Evento a borrar",
        date: clientData.date,
        type: 1,
        image: "",
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

    if (clientData.content === undefined || clientData.title === undefined || 
        clientData.date === undefined) {
        let result = {
            message: 'Client Error: Title/Body/Date are undefined',
            ok: false,
        }
        return result;
    }

    try {
        if (clientData.content.trim() === '') {
            let result = {
                message:  "La descripción de evento no debe estar vacía.",
                ok: false,
            }
            return result
        }

        if (clientData.title.trim() === '') {
            let result = {
                message:  "El título de evenot no debe estar vacío.",
                ok: false,
            }
            return result
        }

        if (! (clientData.date instanceof Date)) {
            clientData.date = Date(clientData.date);
            console.log("Date converted: ", clientData.date.toISOString());
        }

    } catch (err) {
        console.error(err);
        let result = {
            message:  "Error: " + err.message,
            ok: false,
        }
        return result;
    }

    // UPLOAD TO FIRESTORE
    try {
        // DEFINE NEW EVENT OBJECT
        const event = {
        title: clientData.title,
        content: clientData.content,
        date: firebase.firestore.Timestamp.fromDate(clientData.date),      // Timestamp is more lightweight than Date
        type: clientData.type || 1,
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


Event.deleteEvent = async (eventId) => {
    // Todo delete an event
}


Event.getAllEvents = async () => {
    //
}

Event.getOneEvent = async () => {
    //
}

Event.uploadImage = async (eventId, imageFile) => {
    // Returns error if any and the image URL from storage
    if (typeof(eventId) !== 'string') {
        console.log('API Error: eventId is not a String');
        return null;
    };
        
    let storageRef = storage.ref();   // => referencia base de nuestro storage
    let eventRef = storageRef.child('events').child(eventId);
    console.log("Adding image to folder:", eventRef.name); 

    try {
        let fileRef = eventRef.child(imageFile.name);
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

Event.addImageToEvent = async (eventId, imageFile) => {
    // Get blogpost data
    const postRef = await db.collection('event').doc(eventId).catch(err => {
        console.error(err);
        return;
    }); // create a reference or pointer to db

    const doc = await postRef.get().catch(err => {
        console.error(err);
        return;
    }); // actually get the data
    
    if (!doc.exists) {
        console.log("API ERROR: Post not found");
        return;
    }
        
    // Delete from storage if existing image
    if (doc.data().image !== "") {
        await Event.deleteImage(eventID, doc.data().image);
        console.log("Event id has Existing image. Deleting from storage...")
    }

    // Upload and update the downloadURL
    try {
        const {error, url} = await Event.uploadImage(eventId, imageFile);

        let imageUrl = url || "";  // if null, default to empty string
        
        await postRef.update({
            image: imageUrl,
        });

        if (error) {
            throw error;
        }

        let result = {
            ok:true,
            message:"Se agregó la imagen al evento con éxito",
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

Event.deleteImage = async (eventId, fileUrl) => {
    console.log("File url", fileUrl);
    try {
        let fileRef = storage.refFromURL(fileUrl);
        console.log("Deleting image: " + fileRef.name);
        await fileRef.delete();
        console.log("Deleted image for event: " + postId)
    } catch (err) {
        console.error(err);
    }
}

export default Event;