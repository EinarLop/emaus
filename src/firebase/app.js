import { firebase } from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = require('./config/config').firebase;

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

export { db, auth }