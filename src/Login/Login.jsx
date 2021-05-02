import {useState} from 'react'
import User from '../firebase/users'

const Login = () => {

  const [state, setState] = useState({
    user: '',
    pass: '',
  })

  const onLogin = async () => {
    console.log("Called onLogin:");
    console.dir(state);

    const user = state.user;
    const pass = state.pass;

    if (user.trim()==='' || pass.trim()==='') {
      // feedback message: Favor de llenar los campos
      return;
    }
    if (likeEmail(user)) {
      console.log("Email")
      let res = await User.loginUser(user, pass);
      console.log(res)
    } else {
      console.log("Username")
      let res = await User.loginWithUsername(user, pass);
      console.log(res)
    }
    //setTimeout(()=>{User.logOut()}, 3000);
  }

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    const newState = {
      ...state,
      [e.target.name]: e.target.value,
    }

    setState(newState);
  }

  return (
    <section class="text-gray-600 body-font">

      <div class="flex flex-col text-center w-full mb-2">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Inicio de sesión administrador</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Inicia sesión para administrar el contenido del sitio web</p>
      </div>
      <div class="container px-5 py-4 mx-auto flex flex-wrap items-center">
        <div class=" md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col mx-auto w-full  md:mt-0">
          <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Inicia sesión</h2>
          <div class="relative mb-4">
            <label for="user" class="leading-7 text-sm text-gray-600">Nombre de usuario</label>
            <input type="text" id="user" name="user" onChange={handleChange} 
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div class="relative mb-4">
            <label for="pass" class="leading-7 text-sm text-gray-600">Contraseña</label>
            <input type="pass" id="pass" name="pass" value={state.pass} onChange={handleChange} 
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <button onClick={onLogin}
             class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
               Iniciar sesión
          </button>
          <p class="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
        </div>
      </div>
    </section >
  )
}

const likeEmail = (string) => {
  return string.includes('@') && string.includes('.');
}

export default Login