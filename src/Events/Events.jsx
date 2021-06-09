import { useState, useEffect } from 'react'
import EventCard from "../Components/EventCard.jsx"
import Event from '../firebase/events'
import Page from '../firebase/pages'
import useLogin from '../hooks/useLogin'
import {Link} from 'react-router-dom'

const Events = () => {

    const {loginStatus} = useLogin();

    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({
        mainTitle: "Cargando...",
        mainKicker: "Cargando...",
        mainDescription: "Cargando...",
    })

    useEffect(() => {
        async function fetchData() {
            const events = await Event.getAllEvents();
            setEventList(events);
            setLoading(false);
        }
        async function fetchPage() {
            const pageData = await Page.getEvents();
            setContent(pageData);
        }
        fetchPage();
        fetchData();
    }, [])

    return (
        <>
            {loginStatus && (
            <div class="p-4 w-full mx-auto max-w-xl">
                            <button class=" mx-auto w-full  text-xl text-color bg-blue-100 border-2 border-blue-100 py-2 px-8 focus:outline-none hover:border-blue-300 rounded text-lg">
                                <Link
                                    to="/admin/panel"
                                > Volver al panel administrativo
                            </Link>
                            </button>
            </div>)}
            <div class=" container px-5 py-16 md:py-12   flex flex-wrap justify-center mx-auto">
                <div class="flex flex-col text-center w-full mb-4 ">
                    <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">{content.mainKicker}</h2>
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{content.mainTitle}</h1>
                    <p class=" lg:w-2/3 mx-auto leading-relaxed text-base">{content.mainDescription}</p>
                </div>
            </div>
            {
                loading ? <p>Cargando Eventos...</p>
                    :
                    (eventList.length ?
                        <div>
                            {eventList.map((e, i) => (<EventCard key={i} eventInfo={e} />))}
                        </div>
                        : (<p class="text-center">No hay eventos planeados</p>)
                    )}
        </>
    );
}

export default Events;