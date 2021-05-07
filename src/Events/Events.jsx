import { useState, useEffect } from 'react'
import EventCard from "../Components/EventCard.jsx"
import Event from '../firebase/events'

const Events = () => {

    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            console.log("Fetching events data...");
            const events = await Event.getAllEvents();
            setEventList(events);
            setLoading(false);
        }
        fetchData();
    }, [])

    return (
        <>
            <div class=" container px-5 py-16 md:py-12   flex flex-wrap justify-center mx-auto">
                <div class="flex flex-col text-center w-full mb-4 ">
                    <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">ROOF PARTY POLAROID</h2>
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Master Cleanse Reliac Heirloom</h1>
                    <p class=" lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
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