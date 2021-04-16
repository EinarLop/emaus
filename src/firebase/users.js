import { firebase } from './app';

const User = {}


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