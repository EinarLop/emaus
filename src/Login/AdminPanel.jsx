import { useState } from 'react'
import { Link } from "react-router-dom"
import { Redirect } from 'react-router-dom'
import useLogin from '../hooks/useLogin'
import User from '../firebase/users'

const AdminPanel = () => {

  const { loginStatus } = useLogin();
  const [redirect, setRedirect] = useState(false);

  const logOut = async (e) => {
    console.log("Logging out...");
    await User.logOut();
    setRedirect(true);
  }

  return (
    <>
      {(redirect && <Redirect to="/admin/login" />)}
      <div class="flex flex-col text-center w-full mb-4 px-8">
        <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">COMUNIDAD EMAÚS A.C</h2>
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Panel administrativo </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
      </div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-4 mx-auto">
          <div class="flex justify-center flex-wrap">
            <div class="p-4 h-64 w-full  md:w-1/4">
              <button class=" mx-auto w-full h-full text-xl text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
                <Link
                  to="/admin/inicio"
                > Editar contenido página  Inicio
              </Link>
              </button>
            </div>
            <div class="p-4 h-64 w-full sm:w-full md:w-1/4">
              <button class=" mx-auto w-full h-full text-xl  text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">

              </button>
              <Link
                to="/admin/donativos"
              > Editar contenido página Apóyanos
              </Link>
            </div>
            <div class="p-4 h-64 w-full sm:w-full md:w-1/4">
              <button class=" mx-auto w-full h-full text-xl  text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                <Link
                  to="/admin/blog"
                > Administrar blogs
              </Link>
              </button>
            </div>
            <div class="p-4 h-64 w-full sm:w-full md:w-1/4">
              <button class=" mx-auto w-full h-full text-xl  text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                <Link
                  to="/admin/eventos"
                > Administrar eventos
              </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div class="p-4 h-30 sm:w-full md:w-1/4 mx-auto">
        <button class=" mx-auto w-full h-full text-xl  text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg" onClick={logOut}>CERRAR SESIÓN</button>
      </div>
    </>
  )
}
export default AdminPanel