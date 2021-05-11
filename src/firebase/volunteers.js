import { firebase, db } from "./app";

/* ------ CRD DE VOLUNTARIOS ------ */
const Volunteer = {};

// CREATE
Volunteer.registerOne = async (clientData) => {
  if (clientData === undefined) {
    let result = {
      ok: false,
      message: "Client Error: no data object received",
    };
    return result;
  }

  const { valid, errors } = validateClientData(clientData);

  if (!valid) {
    let result = {
      ok: false,
      message: "Hay errores de validación.",
      errors: errors,
    };
    return result;
  }

  try {
    clientData.date = firebase.firestore.Timestamp.fromDate(new Date()); // Timestamp is more lightweight than Date
    console.log("New volunteer", clientData);
    const newDoc = await db.collection("volunteer").add(clientData);
    let result = {
      ok: true,
      message: "Tu registro se envió exitosamente.",
      id: newDoc.id,
    };
    return result;
  } catch (err) {
    console.error(err);
    let result = {
      ok: false,
      message: "API Error: " + err.message,
      errors: [],
    };
    return result;
  }
};

// GET
Volunteer.getAllVolunteers = async () => {
  try {
    const data = await db.collection("volunteer").orderBy("date", "desc").get();

    let volunteers = [];

    data.forEach((doc) => {
      let obj = {
        volunteerId: doc.id,
        name: doc.data().name,
        phone: doc.data().phone,
        email: doc.data().mail,
        note: doc.data().note,
        date: doc.data().date,
      };
      volunteers.push(obj);
    });

    console.log("Fetched volunteers succesfully");
    return volunteers;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// DELETE
Volunteer.deleteVolunteer = async (volunteerId) => {
  console.log("delete Volunteer id:", volunteerId);
  try {
    await db.collection("volunteer").doc(volunteerId).delete();
    let result = {
      message: "El registro se borró exitosamente",
      ok: true,
    };
    return result;
  } catch (err) {
    let result = {
      message: "Error al buscar registro con id" + volunteerId,
      ok: false,
    };
    return result;
  }
};

const validateClientData = (clientData) => {
  let valid = true;
  let errors = [];

  try {
    if (clientData.name.trim() === "") {
      errors.push("Favor de proporcionar su nombre.");
    }
    if (clientData.phone.trim() === "" && clientData.mail.trim() === "") {
      errors.push("Favor de proveer al menos un medio de contacto.");
    }
  } catch (err) {
    console.error(err);
    errors.push(err.message);
  }

  if (errors.length > 0) {
    valid = false;
  }

  return { valid, errors };
};

export default Volunteer;
