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
      {loginStatus ? (
        <>
          <div class="flex flex-col text-center w-full mb-4 px-8">
            <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">COMUNIDAD EMAÚS A.C</h2>
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Panel administrativo </h1>

            <div class="max-w-xl mx-auto">
              <p class="text-xl font-medium mb-4">¡Bienvenid@ al panel de Administración de Emaús Web!  </p>
              <ul class="list-inside list-disc text-left">
                <li class="my-2 "><i class="font-medium">Editar Contenido Página Inicio:</i> para editar el texto mostrado en la página <b class="text-indigo-400" >Inicio</b>.</li>
                <li class="my-2"><i class="font-medium">Editar Contenido Página Apoyanos: </i>para editar el texto mostrado en la página <b class="text-indigo-400" >Apóyanos</b>.</li>
                <li class="my-2"><i class="font-medium">Administrar Blogs:</i> crear y eliminar publicaciones de <b class="text-indigo-400">Blog</b>, y seleccionar publicaciones destacadas.</li>
                <li class="my-2"><i class="font-medium">Administrar Eventos:</i> usted puede crear nuevos eventos futuros. o eliminar los ya existentes. Todos los eventos se mostrarán en la página de <b class="text-indigo-400">Eventos</b>.</li>
                <li class="my-2"><i class="font-medium">Registros a Voluntariado: </i> usted puede visualizar las posulaciones a voluntariado que han hecho los visitantes del sitio en la página de <b class="text-indigo-400">Apóyanos</b>, y borrar los mismos.</li>
              </ul>
            </div>


          </div>
          <section class="text-gray-600 body-font">
            <div class="container px-5 py-4 mx-auto">
              <div class="flex justify-center flex-wrap">

                <Link class="p-4 h-64 w-full  md:w-1/4" to="/admin/inicio">
                  <button class=" mx-auto w-full h-full text-xl text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
                    Editar contenido página Inicio
                  </button>
                </Link>

                <Link class="p-4 h-64 w-full  md:w-1/4" to="/admin/donativos">
                  <button class=" mx-auto w-full h-full text-xl  text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">
                    Editar contenido página Apóyanos
                  </button>
                </Link>

                <Link class="p-4 h-64 w-full  md:w-1/4" to="/admin/blog">
                  <button class=" mx-auto w-full h-full text-xl  text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">

                    Adminsitrar Blog
                  </button>
                </Link>

                <Link class="p-4 h-64 w-full  md:w-1/4" to="/admin/eventos">
                  <button class=" mx-auto w-full h-full text-xl  text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">

                    Administrar eventos
                  </button>
                </Link>




                <Link class="p-4 h-64 w-full  md:w-1/4" to="/admin/voluntarios">
                  <button class=" mx-auto w-full h-full text-xl  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">


                    Registros a voluntariado
                  </button>
                </Link>

              </div>
            </div>
          </section>
          <div class="p-4 h-30 sm:w-full md:w-1/4 mx-auto">
            <button class=" mx-auto w-full h-full text-xl  text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg" onClick={logOut}>CERRAR SESIÓN</button>
          </div>
        </>
      ) :
        (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h1 style={{ textAlign: 'center' }}>404 Ruta no encontrada</h1>
          </div>
        )}
    </>
  )
}
export default AdminPanel