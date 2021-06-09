import { useState, useEffect } from 'react'
import Event from '../firebase/events'
import Page from '../firebase/pages'
import EventCardAdmin from "../Components/EventCardAdmin"
import { Link } from "react-router-dom";
import useLogin from '../hooks/useLogin'


const EventsAdmin = () => {

    const { loginStatus } = useLogin();
    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState("");
    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        async function fetchData() {
            console.log("Fetching events data...");
            const events = await Event.getAllEvents();
            setEventList(events);
            setLoading(false);
        }
        async function fetchPage() {
            console.log("Fetching Events page info...");
            const pageData = await Page.getEvents();
            setContent(pageData);
        }
        fetchPage();
        fetchData();
    }, [])

    const [content, setContent] = useState({
        mainTitle: "Titulo",
        mainKicker: "mainKicker",
        mainDescription: "Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag",
    })

    const handleRedirect = () => {
        console.log("Redirecting...");

        let msg = <p styles={{ color: '#9ccc65' }}>¡Página actualizada correctamente!</p>
        setMsg(msg);
        setTimeout(() => {
            refreshPage();
        }, 2000);
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const handleOnChange = (event) => {
        console.log(event.target.textContent);
        setContent({
            ...content,
            [event.target.align]: event.target.textContent,
        });
        console.log(content);
    }


    const handleOnSubmit = async () => {
        setShowButton(false);
        const res = await Page.updateEvents(content);
        console.log(res);
        handleRedirect()
    }

    ////////////////////////// Delete Event ////////////////////////////
    const onDelete = async (index, eventId) => {
        console.log("Deleting event", index);
        console.log("Deleting event eventId", eventId);
        let newEvents = eventList.filter((event, event_index) => event_index !== index);
        setEventList(newEvents);
        let res = await Event.deleteEvent(eventId);
        console.log("Deleted from firestore result:", res);
    }


    ////////////////////////// Delete Event ////////////////////////////

    return (
        <>
            { loginStatus ? (
                <>
                    <div class="bg-blue-300 flex flex-col text-center w-full mb-4 p-4">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Administración del contenido de la página de eventos</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-xl">Usted se encuentra en modo de edición. Escriba sobre las entradas de texto y presione guardar cambios cuando termine para actualizar el contenido.</p>
                        <div class="w-full flex justify-center my-8">

                            <button class="text-white bg-indigo-500 border-0 py-4 px-10 focus:outline-none hover:bg-indigo-600 rounded text-lg"> <Link to="/admin/crear/evento"> Crear nuevo evento </Link> </button>

                        </div>

                        <div class="p-4 w-full mx-auto max-w-xl">
                            <button class=" mx-auto w-full  text-xl text-color bg-blue-100 border-2 border-blue-100 py-2 px-8 focus:outline-none hover:border-blue-300 rounded text-lg">
                                <Link
                                    to="/admin/panel"
                                > Volver al panel administrativo
                            </Link>
                            </button>
                        </div>
                    </div>

                    <div class=" container px-5 py-16 md:py-12   flex flex-wrap justify-center mx-auto">
                        <div class="flex flex-col text-center w-full mb-4 ">
                            <h2 contenteditable="True" onBlur={handleOnChange} align="mainKicker" class="text-xs  h-auto text-indigo-500 tracking-widest font-medium title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.mainKicker}</h2>
                            <h1 contenteditable="True" onBlur={handleOnChange} align="mainTitle" class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 focus:bg-blue-100 focus:outline-none">{content.mainTitle}</h1>
                            <p contenteditable="True" onBlur={handleOnChange} align="mainDescription" class="lg:w-2/3 mx-auto leading-relaxed text-base focus:bg-blue-100 focus:bg-blue-100 focus:outline-none">{content.mainDescription}</p>
                        </div>
                    </div>
                    {
                        loading ? <p>Cargando Eventos...</p>
                            :
                            (eventList.length ?
                                <div>
                                    {eventList.map((e, i) => (<EventCardAdmin key={i} delete={() => onDelete(i, e.eventId)} eventInfo={e} />))}
                                </div>
                                : (<p class="text-center">No hay eventos planeados</p>)
                            )}
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

export default EventsAdmin;

