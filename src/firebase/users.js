import { firebase, db } from './app';
import Post from './posts';

const User = {}


/* AUTHENTICATION */
User.loginUser = async (email, password) => {
    const user = {
        email: email,
        password: password
    }

    const { valid, errors } = validateLogin(user);
    if (!valid) {
        let result = {
            ok: false,
            errors: errors,
        }
        return result;
    }
    try {
        const resp = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
        let result = {
            ok: true,
            token: resp.user.getIdToken(),
        }

        await firebase.auth().signOut(); // testing
        return result;
    
    } catch (err) {
        console.error(err);
        let result = {
            ok: false,
            errors : {
                general: "El usuario o contraseña son incorrectos",
            }
        }
    }
}

const validateLogin = ({email, password}) => {
    if (email.trim() === "") {
        let valid = false;
        let errors = "Correo no debe de estar vacío";
        return {valid, errors};
    }
    if (password.trim() === "") {
        let valid = false;
        let errors = "Contraseña no debe de estar vacía";
        return {valid, errors};
    }

    let valid = true;
    let errors = "";
    return {valid, errors};
}

User.logOut = async () => {
    const res = await firebase.auth().signOut();
    return res;
}


/* USER INFO */

User.logInWithUsername = async (username, password) => {
    // look for User object with given username
    try {
        const userRef = db.collection('users');
        const query = await userRef.where('username', '==', username).get();
        if (query.empty) {
            console.log("No user found");
        }
        let user = null;
        query.forEach(doc => {
            user = doc.data();
        });

        return await User.loginUser(user.email, password);

    } catch (err) {
        console.error(err);
    }
}

// User should be able to 

export default User;