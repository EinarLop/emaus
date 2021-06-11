import { useState, useEffect } from 'react'
import Page from '../firebase/pages'
import Volunteer from '../firebase/volunteers'
import { TiGroup } from "react-icons/ti"
import { RiTShirt2Fill } from "react-icons/ri"
import { RiStethoscopeFill } from "react-icons/ri"
import useLogin from '../hooks/useLogin'
import {Link} from 'react-router-dom'

const Donate = () => {

    const {loginStatus} = useLogin();
    const [msg, setMsg] = useState("")

    const [content, setContent] = useState({
        electronicDescription: "Cargando...",
        traditionalDescription: "Cargando...",
        clabeNumber: "Cargando...",
        disclaimerDescription: "Cargando...",
        officialData: "Cargando...",
        voluntariado1Title: "Cargando...",
        voluntariado1Desc: "Cargando...",
        voluntariado2Title: "Cargando...",
        voluntariado2Desc: "Cargando...",
        voluntariado3Title: "Cargando...",
        voluntariado3Desc: "Cargando...",
        email: "Cargando...",
        telephone: "Cargando...",
        registerVol: "Cargando...",
        officialAddress: "Carr. Xochimilco Topilejo No. 33 Col. San Miguel Topilejo Alcaldía Tlalpan CDMX  C.P. 14500",
    })

    const [volunteer, setVolunteer] = useState({
        name: "",
        phone: "",
        email: "",
        note: "",
    })

    useEffect(() => {
        async function fetchPage() {
            const pageData = await Page.getDonations();
            setContent(pageData);
        }
        fetchPage();
    }, [])

    const handleOnChange = (e) => {
        const temp = {
            ...volunteer,
            [e.target.name]: e.target.value,
        }
        setVolunteer(temp);
    }

    const submitVolunteer = async () => {
        setMsg("");
        if (volunteer.name===""){
            setMsg("Por favor, proporciona un nombre para tu contacto.");
            return;
        }
        if (volunteer.email==="" && volunteer.phone==="") {
            setMsg("Por favor, proporciona algún medio de contacto (correo o teléfono).");
            return;
        }
        
        const currentVolunteer = volunteer;
        let res = await Volunteer.registerOne(currentVolunteer);
        console.log(res);
        let form = {
            name: "",
            phone: "",
            email: "",
            note: "",
        }
        setVolunteer(form);
        setMsg(res.message);
        setTimeout(() => {
            setMsg("");
        }, 6000);
    }

    const openPaypal = () => {
        const link = "https://www.paypal.com/mx/webapps/mpp/donar";
        window.open(link, "_blank");
    }

    const iframeStyle = {
        width: "100%",
        height: "100%",
        frameborder: "0",
        marginheight: "0",
        marginwidth: "0",
        title: "map",
        scrolling: "no",
    }

    return (
        <>
            {loginStatus && (<div class="p-4 w-full mx-auto max-w-xl">
                            <button class=" mx-auto w-full  text-xl text-color bg-blue-100 border-2 border-blue-100 py-2 px-8 focus:outline-none hover:border-blue-300 rounded text-lg">
                                <Link
                                    to="/admin/panel"
                                > Volver al panel administrativo
                            </Link>
                            </button>
            </div>)}
            <div class="text-center mb-4 px-4">
                <h1 class="sm:text-4xl text-3xl font-medium title-font text-gray-900 mb-4">Donativos</h1>

            </div>
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-5 mx-auto">
                    <div class="text-center mb-4">
                        <h1 class="sm:text-2xl text-2xl font-medium title-font text-gray-900 mb-4">Métodos electrónicos de donación</h1>
                        <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">{content.electronicDescription}</p>

                    </div>
                </div>
                <button onClick={openPaypal}
                    class="flex mx-auto  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Dona a través de Paypal
                    </button>
            </section >


            <section class="text-gray-600  mt-4 mb-8">
                <div class="container px-5 py-5 mx-auto">
                    <div class="text-center mb-4">
                        <h1 class="sm:text-2xl text-2xl font-medium title-font text-gray-900 mb-4 mt-4">
                            {content.traditionalDescription}
                        </h1>

                        <p class="text-xl leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
                            CUENTA BBVA Bancomer: 0157923031
                        </p>
                        <p class="text-xl leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s mb-4">   </p>
                        <p class="text-xl leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s mb-4">   {content.clabeNumber}</p>
                        <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s mb-4"> {content.disclaimerDescription}  </p>
                        <p class="text-lg leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s"> Nuestros datos oficiales: </p>
                        <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
                            {content.officialData}
                        </p>


                    </div>
                </div>

            </section >

            <section section class="text-gray-600 body-font" >
                <div class="container px-5 mb-16 mx-auto">
                    <div class="flex flex-wrap justify-center sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                        <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                                < TiGroup class="w-12 h-12 " />
                            </div>
                            <div class="flex-grow">
                                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                                    {content.voluntariado1Title}
                                </h2>
                                <p class="leading-relaxed text-base">
                                    {content.voluntariado1Desc}
                                </p>
                            </div>
                        </div>
                        <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                                <RiTShirt2Fill class="w-12 h-12" />
                            </div>
                            <div class="flex-grow">
                                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                                    {content.voluntariado2Title}
                                </h2>
                                <p class="leading-relaxed text-base">
                                    {content.voluntariado2Desc}
                                </p>
                            </div>
                        </div>
                        <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                                <RiStethoscopeFill class="w-12 h-12" />

                            </div>
                            <div class="flex-grow">
                                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">{content.voluntariado3Title}</h2>
                                <p class="leading-relaxed text-base">
                                    {content.voluntariado3Desc}
                                </p>
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

                        <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.7589658776446!2d-99.13772068477682!3d19.205727252872023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce06fa6596ea65%3A0x55859f2a00c06a12!2sXochimilco-topilejo%2033%2C%20San%20Miguel%20Topilejo%2C%20Tlalpan%2C%2014500%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1618792388699!5m2!1ses!2smx" width="600" height="450" allowfullscreen="" loading="lazy" class="absolute inset-0" style={iframeStyle} ></iframe>
                        <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                            <div class="lg:w-1/2 px-6">
                                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">DIRECCIÓN</h2>
                                <p class="mt-1">{content.officialAddress}</p>
                            </div>
                            <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                                <p class="text-indigo-500 leading-relaxed">example@email.com</p>
                                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">TELÉFONO</h2>
                                <p class="leading-relaxed">
                                    55 8936 8636
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                        <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Registrate</h2>
                        <p class="leading-relaxed mb-5 text-gray-600">
                            {content.registerVol}
                        </p>
                        <div class="relative mb-4">
                            <label for="name" class="leading-7 text-sm text-gray-600">Nombre</label>
                            <input type="text" id="name" name="name" value={volunteer.name} onChange={handleOnChange}
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div class="relative mb-4">
                            <label for="phone" class="leading-7 text-sm text-gray-600">Phone</label>
                            <input type="tel" name="phone" value={volunteer.phone} onChange={handleOnChange}
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="10" title="Ten digits code" required />
                        </div>
                        <div class="relative mb-4">

                            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="email" name="email" value={volunteer.email} onChange={handleOnChange}
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                        </div>
                        <div class="relative mb-4">
                            <label for="note" class="leading-7 text-sm text-gray-600">Notas Adicionales</label>
                            <textarea id="note" name="note" value={volunteer.note} onChange={handleOnChange}
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                        <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                            onClick={submitVolunteer}>
                            Contáctanos
                        </button>
                        <div class="text-xs text-gray-500 mt-3 text-center" style={{fontSize:18}}>
                           {msg}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Donate;