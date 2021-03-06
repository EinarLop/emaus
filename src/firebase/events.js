import { firebase, db, storage } from "./app";

/* ------ CRUD DE EVENTOS ----- */
const Event = {};

// CREATE
Event.createNewEvent = async (clientData) => {
  const validation = validateClientData(clientData);
  if (!validation.ok) {
    return validation;
  }

  try {
    if (!(clientData.date instanceof Date)) {
      console.log("Converting Datestring to Date...");
      clientData.date = new Date(clientData.date);
      console.log("Date converted: ", clientData.date);
    }
  } catch (err) {
    console.error(err);
    let result = {
      message: "Error: " + err.message,
      ok: false,
    };
    return result;
  }

  // Upload to firestore
  try {
    // define new event object
    console.log("Date to be sent to Firebase:", clientData.date); // toma en cuenta Timezone de MX
    console.log(typeof clientData.date);
    console.log(clientData);
    const event = {
      title: clientData.title,
      content: clientData.content,
      date: firebase.firestore.Timestamp.fromDate(clientData.date), // Timestamp is more lightweight than Date
      type: clientData.type || 1,
      image: "", // downloadURL
    };

    const newEvent = await db.collection("event").add(event);

    console.log("New event id: ", newEvent.id);
    console.dir(newEvent);

    let result = {
      ok: true,
      message: "El evento se publicó exitosamente",
      id: newEvent.id, // para la URL individual del nuevo post
    };
    return result;
  } catch (err) {
    console.error(err);
    let result = {
      ok: false,
      message: "Algo inesperado sucedió: " + err.message,
    };
    return result;
  }
};

// GET EVENTS
Event.getAllEvents = async () => {
  try {
    const data = await db.collection("event").orderBy("date", "asc").get();

    let events = [];

    data.forEach((doc) => {
      let obj = {
        eventId: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        date: doc.data().date.toDate(),
        image: doc.data().image,
        type: doc.data().type, // category: efeméride, cultural, cumpleaños, religiosa, recreativa
      };
      events.push(obj);
    });

    console.log("Fetched events succesfully");
    console.log("Events type:", typeof events);
    return events;
  } catch (err) {
    console.error(err);
    return err;
  }
};

Event.getOneEvent = async (eventId) => {
  try {
    const evtRef = await db.collection("event").doc(eventId);
    const doc = await evtRef.get();
    if (!doc.exists) {
      let result = {
        ok: false,
        message: "No se encontró el Evento especificado.",
      };
      return result;
    }
    // Todo ok
    let result = {
      ok: true,
      data: doc.data(),
    };

    return result;
  } catch (err) {
    console.error(err);
    let result = {
      ok: false,
      message: "API Error:" + err.message,
    };
    return result;
  }
};

// UPDATE
Event.updateEvent = async (eventId, eventData) => {

  const validation = validateClientData(eventData);

  if (!validation.ok) {
    return validation;
  }

  const docRef = db.collection("event").doc(eventId);

  try {
    if (eventData.date !== undefined) {
      eventData.date = firebase.firestore.Timestamp.fromDate(eventData.date);
    }

    await docRef.update(eventData);
    let result = {
      ok: true,
      message: "El evento fue actualizado correctamente.",
    };
    return result;
  } catch (e) {
    console.error(e);
    let result = {
      message: "Server Error: " + e.message,
      ok: false,
    };
    return result;
  }
};

// DELETE
Event.deleteEvent = async (eventId) => {
  console.log("delete Event id:", eventId, typeof eventId);

  try {
    const eventRef = await db.collection("event").doc(eventId);

    // Delete event image
    const imageUrl = (await eventRef.get()).data().image;
    if (imageUrl !== "") {
      let delImg = await Event.deleteImage(eventId, imageUrl);
      console.log(imageUrl, "deleted:\n", delImg);
    }

    let res = await eventRef.delete();
    console.log("deleteEvent returned:", res);

    let result = {
      message: "El evento fue eliminado exitosamente",
      ok: true,
    };
    return result;
  } catch (err) {
    let result = {
      message: "Error al buscar Evento con id" + eventId,
      ok: false,
    };
    return result;
  }
};

// EVENT IMAGE MANAGEMENT
Event.uploadImage = async (eventId, imageFile) => {
  // Returns error if any and the image URL from storage
  if (typeof eventId !== "string") {
    console.log("API Error: eventId is not a String");
    return null;
  }

  let storageRef = storage.ref(); // => referencia base de nuestro storage
  let eventRef = storageRef.child("events").child(eventId);

  try {
    let fileRef = eventRef.child(imageFile.name);
    console.log("Storage reference: ", fileRef.fullPath);
    await fileRef.put(imageFile);
    let url = await fileRef.getDownloadURL();
    console.log("Saved succesfully to Storage.");
    return { error: null, url: url };
  } catch (err) {
    console.error(err);
    return { error: err, url: null };
  }
};

Event.addImageToEvent = async (eventId, imageFile) => {
  console.log("imageFile:", imageFile);
  if (!imageFile) return;
  // Get blogpost data
  try {
    const postRef = await db.collection("event").doc(eventId); // create a reference or pointer to db

    const doc = await postRef.get().catch((err) => {
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
      console.log("Event id has Existing image. Deleting from storage...");
    }

    // Upload and update the downloadURL
    const { error, url } = await Event.uploadImage(eventId, imageFile);

    let imageUrl = url || ""; // if null, default to empty string

    await postRef.update({
      image: imageUrl,
    });

    if (error) {
      throw error;
    }

    let result = {
      ok: true,
      message: "Se agregó la imagen al evento con éxito",
    };
    return result;
  } catch (err) {
    // MAX IMAGE SIZE: 2MB
    console.error(err);

    let result = {
      ok: false,
      message: "Storage error: \n" + err.message,
    };
    return result;
  }
};

Event.deleteImage = async (eventId, fileUrl) => {
  console.log("File url", fileUrl);
  try {
    let fileRef = storage.refFromURL(fileUrl);
    console.log("Deleting image: " + fileRef.name);
    await fileRef.delete();
    console.log("Deleted image for event: " + eventId);
  } catch (err) {
    console.error(err);
  }
};

const validateClientData = (data) => {
  if (!data) {
    let result = {
      message: "Client Error: no client Data received",
      ok: false,
    };
    return result;
  }

  try {
    if (data.content.trim() === "") {
      let result = {
        message: "La descripción de evento no debe estar vacía.",
        ok: false,
      };
      return result;
    }

    if (data.title.trim() === "") {
      let result = {
        message: "El título de evento no debe estar vacío.",
        ok: false,
      };
      return result;
    }

    // All is ok
    let result = {
      ok: true,
    };
    return result;
  } catch (e) {
    console.error(e);
    let result = {
      ok: false,
      message: "Type Error: title/content no son strings",
    };

    return result;
  }
};

Event.defaultImage =
  "https://firebasestorage.googleapis.com/v0/b/emaus-49818.appspot.com/o/default%2FEmaus_Default.jpg?alt=media&token=5ba32091-4e93-4262-a325-f3a5f3dc9a34";

export default Event;
