import {firebase, db, storage} from './app'

const Event = {};

// Create new event
Event.creatNewEvent = async (clientData) => {
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
            console.log("Converting Datestring to Date...");
            clientData.date = Date(clientData.date);        
            console.log("Date converted: ", clientData.date);
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
        console.log("Date to be sent to Firebase:", clientData.date);  // toma en cuenta Timezone de MX
        
        const event = {
        title: clientData.title,
        content: clientData.content,
        date: firebase.firestore.Timestamp.fromDate(clientData.date),      // Timestamp is more lightweight than Date
        type: clientData.type || 1,
        image: "",    // downloadURL
        }

        const newEvent = await db.collection('event').add(event);

        console.log("New event id: ", newEvent.id);
        console.dir(newEvent);

        let result = {
            ok: true,
            message: "El evento se publicó exitosamente",
            id: newEvent.id,    // para la URL individual del nuevo post
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
    console.log("delete Event id:", eventId, typeof(eventId));
    try {
        const res = await db.collection('event').doc(eventId).delete();
        let result = {
            message: "Deleted succesfully",
            ok: true,
        }
        return result;

    } catch (err) {
        let result = {
            message: "Error al buscar Evento con id"  + eventId,
            ok: false,
        }
        return result;
    }
}


Event.getAllEvents = async () => {
    try {
        const data = await db.collection('event').orderBy('date', 'asc').get();
    
        let events = [];
    
        data.forEach(doc => {
            let obj = {
                eventId: doc.id,
                title: doc.data().title,
                content: doc.data().content,
                date: doc.data().date.toDate(),
                image: doc.data().image,
                type: doc.data().type,
            }
            events.push(obj);
        })
    
        console.log("Fetched events succesfully");
        return events;
    
        } catch (err) {
            console.error(err);
            return err;
        }
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
        await Event.deleteImage(eventId, doc.data().image);
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
        console.log("Deleted image for event: " + eventId)
    } catch (err) {
        console.error(err);
    }
}

export default Event;