import Slider from "../Components/Slider"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Page from '../firebase/pages'
import useLogin from '../hooks/useLogin'


const HomeAdmin = () => {

    const [msg, setMsg] = useState("");
    const { loginStatus } = useLogin();
    const [showButton, setShowButton] = useState(true);

    const [content, setContent] = useState({
        mainTitle: "Titulo",
        mainKicker: "Kicker",
        mainDescription: "Description",
        featuredBlogsTitle: "Titulo Blogs",
        featuredBlogsDescription: "Descripción blogs",
    })

    const refreshPage = () => {
        window.location.reload();
    }

    const handleRedirect = (message) => {
        console.log("Redirecting...");
        if (!message) {
            message = "¡Página actualizada exitosamente!";
        }
        let msg = <p styles={{ color: '#9ccc65' }}>{message}</p>
        setMsg(msg);
        setTimeout(() => {
            refreshPage();
        }, 2000);
    }
    // Page.updateHome(content);

    const handleOnChange = (event) => {
        console.log(event.target.textContent);
        setContent({
            ...content,
            [event.target.align]: event.target.textContent,
        });
        console.log(content);
    }

    const handleOnSubmit = async () => {
        // async / await
        setShowButton(false);
        const res = await Page.updateHome(content);
        console.log(res);
        handleRedirect(res.message);
    }


    useEffect(() => {
        async function fetchHome() {
            const homeData = await Page.getHome();
            setContent(homeData);
        }

        fetchHome();
    }, []);

    return (
        <>
            {loginStatus ? (
                <>
                    <div class="bg-blue-300 flex flex-col text-center w-full mb-4 p-4">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Administración del contenido de Página de Inicio</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-xl">Usted se encuentra en modo de edición. Escriba sobre las entradas de texto y presione guardar cambios cuando termine para actualizar el contenido.</p>
                        <div class="p-4 w-full mx-auto max-w-xl">
                            <button class=" mx-auto w-full  text-xl text-color bg-blue-100 border-2 border-blue-100 py-2 px-8 focus:outline-none hover:border-blue-300 rounded text-lg">
                                <Link
                                    to="/admin/panel"
                                > Volver al panel administrativo
                            </Link>
                            </button>
                        </div>
                    </div>

                    <section class=" sm:p-8 text-gray-600 body-font p-4  ">
                        <div class="flex flex-col  text-center w-full mb-8">
                            <h2 contenteditable="True" onBlur={handleOnChange} align="mainKicker" class="text-xs  h-auto text-indigo-500 tracking-widest font-medium title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.mainKicker}</h2>

                            <h1 contenteditable="True" onBlur={handleOnChange} align="mainTitle" class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 focus:bg-blue-100 focus:outline-none">{content.mainTitle}</h1>
                            <p contenteditable="True" onBlur={handleOnChange} align="mainDescription" class="lg:w-2/3 mx-auto leading-relaxed text-base focus:bg-blue-100 focus:bg-blue-100 focus:outline-none">{content.mainDescription}</p>
                        </div>
                        <Slider />

                        <div class="flex flex-col text-center w-full mt-12 mb-8">
                            <h1 contenteditable="True" onBlur={handleOnChange} align="featuredBlogsTitle" class="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900 focus:bg-blue-100 focus:outline-none">{content.featuredBlogsTitle}</h1>
                            <p contenteditable="True" onBlur={handleOnChange} align="featuredBlogsDescription" class="lg:w-2/3 mx-auto leading-relaxed text-base focus:bg-blue-100 focus:outline-none">{content.featuredBlogsDescription}</p>
                        </div>

                        <div class="flex flex-wrap justify-center mx-auto ">

                        </div>

                    </section>
                    <div class="w-full flex justify-center my-20">
                        {msg}
                    </div>
                    <div class="w-full flex justify-center my-20">

                        {showButton && (
                            <button class="text-white bg-green-500 border-0 py-4 px-10 focus:outline-none hover:bg-green-600 rounded text-lg"
                                onClick={handleOnSubmit}>
                                Guardar cambios
                            </button>
                        )}

                    </div>
                </>
            ) :
                (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h1 style={{ textAlign: 'center' }}>404 Ruta no encontrada</h1>
                    </div>
                )}
        </>
    );
}

export default HomeAdmin;