import { useState } from "react"
import Page from '../firebase/pages'
const DonateAdmin = () => {

    const iframeStyle = {
        width: "100%",
        height: "100%",
        frameborder: "0",
        marginheight: "0",
        marginwidth: "0",
        title: "map",
        scrolling: "no",

    }


    const [content, setContent] = useState({
        electronicDescription: "Description",
        traditionalDescription: "Bank Account",
        clabeNumber: "Clabe",
        disclaimerDescription: " Si requieres recibo deducible de impuestos, solicítalo comunicándote con nosotros.",
        officialData: "CLUNI: CEM02062809015 -- RFC.: CEM0206286W0",
        voluntariado1Title: "Voluntariado 1",
        voluntariado1Desc: "Description Voluntariado 1",
        voluntariado2Title: "Voluntariado 2",
        voluntariado2Desc: "Description Voluntariado 2",
        voluntariado3Title: "Voluntariado 3",
        voluntariado3Desc: "Description Voluntariado 3",
        email: "example@gmail.com",
        telephone: "telefono",
        registerVol: "Te invitamos a que nos apoyes como voluntario y te explicamos en qué ámbitos puedes colaborar.",
        officialAddress: "Carr. Xochimilco Topilejo No. 33 Col. San Miguel Topilejo Alcaldía Tlalpan CDMX C.P. 14500"
    })


    const handleOnChange = (event) => {
        setContent({
            ...content,
            [event.target.align]: event.target.textContent,
        });
    }

    const handleOnSubmit = async () => {
        // async / await
        const res = await Page.updateDonations(content);
        console.log(res);
    }

    return (
        <>

            <div class="bg-blue-300 flex flex-col text-center w-full mb-4 p-4">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Administración del contenido de la página principal</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-xl">Usted se encuentra en modo de edición. Escriba sobre las entradas de texto y presione guardar cambios cuando termine para actualizar el contenido.</p>
            </div>

            <div class="text-center mb-4 px-4">
                <h1 class="sm:text-4xl text-3xl font-medium title-font text-gray-900 mb-4">Donativos</h1>

            </div>
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-5 mx-auto">
                    <div class="text-center mb-4">
                        <h1 class="sm:text-2xl text-2xl font-medium title-font text-gray-900 mb-4">Métodos electrónicos de donación</h1>
                        <p contenteditable="True" onBlur={handleOnChange} align="electronicDescription" class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500 tracking-widest title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.electronicDescription}</p>

                    </div>
                </div>
                <button class="flex mx-auto  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Dona a través de Paypal</button>


            </section >


            <section class="text-gray-600  mt-4 mb-8">
                <div class="container px-5 py-5 mx-auto">
                    <div class="text-center mb-4">
                        <h1 class="sm:text-2xl text-2xl font-medium title-font text-gray-900 mb-4 mt-4">Métodos tradicionales de donación</h1>

                        <p contenteditable="True" onBlur={handleOnChange} align="traditionalDescription" class="text-xl leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s tracking-widest font-medium title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.traditionalDescription}</p>
                        <p contenteditable="True" onBlur={handleOnChange} align="clabeNumber" class="text-xl leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s mb-4 tracking-widest  title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.clabeNumber} </p>
                        <p contenteditable="True" onBlur={handleOnChange} align="disclaimerDescription" class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s mb-4 tracking-widest  title-font mb-1 focus:bg-blue-100 focus:outline-none"> {content.disclaimerDescription}</p>
                        <p class="text-lg leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s"> Nuestros datos oficiales: </p>
                        <p contenteditable="True" onBlur={handleOnChange} align="officialData" class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s mb-4 tracking-widest  title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.officialData} </p>


                    </div>
                </div>


            </section >


            {/* /////////////////////////////////////////////////////////////// */}


            <section section class="text-gray-600 body-font" >
                <div class="container px-5 mb-16 mx-auto">
                    <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                        <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <div class="flex-grow">
                                <h2 contenteditable="True" onBlur={handleOnChange} align="voluntariado1Title" class="text-gray-900 text-lg title-font font-medium mb-3 tracking-widest  title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.voluntariado1Title}</h2>
                                <p contenteditable="True" onBlur={handleOnChange} align="voluntariado1Desc" class="leading-relaxed text-base tracking-widest  title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.voluntariado1Desc}</p>
                                <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                    <circle cx="6" cy="6" r="3"></circle>
                                    <circle cx="6" cy="18" r="3"></circle>
                                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                                </svg>
                            </div>
                            <div class="flex-grow">
                                <h2 contenteditable="True" onBlur={handleOnChange} align="voluntariado2Title" class="text-gray-900 text-lg title-font font-medium mb-3 tracking-widest  title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.voluntariado2Title}</h2>
                                <p contenteditable="True" onBlur={handleOnChange} align="voluntariado2Desc" class="leading-relaxed text-base tracking-widest  title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.voluntariado2Desc}</p>
                                <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div class="flex-grow">
                                <h2 contenteditable="True" onBlur={handleOnChange} align="voluntariado3Title" class="text-gray-900 text-lg title-font font-medium mb-3 tracking-widest  title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.voluntariado3Title}</h2>
                                <p contenteditable="True" onBlur={handleOnChange} align="voluntariado3Desc" class="leading-relaxed text-base tracking-widest  title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.voluntariado3Desc}</p>
                                <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <div class="text-center mb-4  px-4">
                <h1 class="sm:text-4xl text-3xl font-medium title-font text-gray-900 mb-4">Voluntariados</h1>

            </div>
            <section class="text-gray-600 body-font relative">
                <div class="container px-5 py-12 mx-auto flex sm:flex-nowrap flex-wrap">
                    <div class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.7589658776446!2d-99.13772068477682!3d19.205727252872023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce06fa6596ea65%3A0x55859f2a00c06a12!2sXochimilco-topilejo%2033%2C%20San%20Miguel%20Topilejo%2C%20Tlalpan%2C%2014500%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1618792388699!5m2!1ses!2smx" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" class="absolute inset-0" style={iframeStyle} ></iframe>
                        <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                            <div class="lg:w-1/2 px-6">
                                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">DIRECCIÓN</h2>
                                <p contenteditable="True" onBlur={handleOnChange} align="officialAddress" class="lg:w-2/3 w-screen leading-relaxed text-base focus:bg-blue-100 focus:outline-none">{content.officialAddress}</p>
                            </div>
                            <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                                <p contenteditable="True" onBlur={handleOnChange} align="email" class="text-indigo-500 leading-relaxedmb-3 tracking-widest  title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.email}</p>
                                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">TELÉFONO</h2>
                                <p contenteditable="True" onBlur={handleOnChange} align="telephone" class="lg:w-2/3 mx-auto leading-relaxed text-base focus:bg-blue-100 focus:outline-none">{content.telephone}</p>
                            </div>
                        </div>
                    </div>
                    <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                        <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Regístrate</h2>
                        <p contenteditable="True" onBlur={handleOnChange} align="registerVol" class="leading-relaxed mb-5 text-gray-600 tracking-widest  title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.registerVol}</p>
                        <div class="relative mb-4">
                            <label for="name" class="leading-7 text-sm text-gray-600">Nombre</label>
                            <input type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div class="relative mb-4">
                            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div class="relative mb-4">
                            <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                            <textarea id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                        <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Contáctanos</button>

                    </div>
                </div>
            </section>

            <div class="w-full flex justify-center my-20">
            <button class="text-white bg-green-500 border-0 py-4 px-10 focus:outline-none hover:bg-green-600 rounded text-lg" onClick={handleOnSubmit}>Guardar cambios</button>
            </div>
        </>
    );
}

export default DonateAdmin;