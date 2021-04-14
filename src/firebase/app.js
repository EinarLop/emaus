const firebase = require('firebase/app');
const firebaseConfig = require('./config/config').firebase;

require('firebase/auth');             // firebase.auth() 
require('firebase/firestore');        // firebase.firestore()

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = {firebase, db};