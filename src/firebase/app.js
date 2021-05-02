import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";

const firebaseConfig = require("./config/config").firebase;
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

export { firebase, db, storage };
