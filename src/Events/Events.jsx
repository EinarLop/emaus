import { useState, useEffect } from 'react'
import EventCard from "../Components/EventCard.jsx"
import Event from '../firebase/events'
import Page from '../firebase/pages'

const Events = () => {

    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({
        mainTitle: "Cargando...",
        mainKicker: "Cargando...",
        mainDescription: "Cargando...",
    })

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

    return (
        <>
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
                        : (<p>No hay eventos planeados</p>)
                    )}
        </>
    );
}

export default Events;