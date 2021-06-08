import { firebase, db } from './app';

const User = {}

/* AUTHENTICATION */
User.loginUser = async (email, password) => {
    // returns an errors object and the status: valid or not
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
            errors: errors,
            token: resp.user.getIdToken(), // still don't know what token is for
        }

        return result;
    
    } catch (err) {
        console.error(err);
        let result = {
            ok: false,
            errors : {
                general: "El usuario o contraseña son incorrectos",
            }
        }
        return result;
    }
}

User.logOut = async () => {
    const res = await firebase.auth().signOut();
    console.log("Succesfull sign out");
    return res;
}


/* USER INFO */

User.loginWithUsername = async (username, password) => {
    // look for User object with given username
    try {
        const userRef = db.collection('users');
        const query = await userRef.where('username', '==', username).limit(1).get();
        if (query.empty) {
            let result = {
                ok: false,
                message: "El usuario especificado no fue encontrado.",
            }
            return result;
        }

        let user = null;

        query.forEach(doc => {
            user = doc.data();
        });

        return await User.loginUser(user.email, password);

    } catch (err) {
        console.error(err);
        let result = {
            ok: false,
            message: "API Error: " + err.message,
        }
        return result;
    }
}

// https://firebase.google.com/docs/auth/users

const validateLogin = ({email, password}) => {
    let errors = {};
    if (isEmpty(email)) errors.email = 'Must not be empty';
    if (isEmpty(password)) errors.password = 'Must not be  empty';
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
     };
}

const isEmpty = (string) => {
    return (string.trim() === '');
}

User.whoLoggedIn = () => {
    const currUser = firebase.auth().currentUser;
    console.log(currUser);
}

export default User;

// https://firebase.google.com/docs/auth/web/manage-users