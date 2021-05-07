import Slider from "../Components/Slider"
import BlogCard from "../Components/BlogCard"
import { useState } from "react"

const HomeAdmin = () => {

    const [content, setContent] = useState({
        mainTitle: "Titulo",
        mainKicker: "Kicker",
        mainDescription: "Description",
        featuredBlogsTitle: "Titulo Blogs",
        featuredBlogsDescription: "Descripción blogs",
    })


    const handleOnChange = (event) => {
        setContent({
            ...content,
            [event.target.align]: event.target.textContent,
        });
    }

    return (
        <>
            <div class="bg-blue-300 flex flex-col text-center w-full mb-4 p-4">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Administración del contenido de Página de Inicio</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-xl">Usted se encuentra en modo de edición. Escriba sobre las entradas de texto y presione guardar cambios cuando termine para actualizar el contenido.</p>
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
                    {/* 
                    <BlogCard subtitle="ARCHANA" title="Post 1" summary="Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et iscing elit, sed do eiusmod tempor incididunt ut labore et iscing elit, sed do eiusm." />



                    <BlogCard subtitle="ARCHANA" title="Hola amixes" summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris laboris l exercitation ullamco laboris  ullamco laboris  ullamco laboris " />


                    <BlogCard subtitle="ARCHANA" title="Hola amixes" summary="Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris labori labori" /> */}

                </div>
            </section>






        </>
    );
}

export default HomeAdmin;