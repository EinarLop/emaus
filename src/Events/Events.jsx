import EventCard from "../Components/EventCard.jsx"
const Events = () => {
    return (

        <>
            <div class=" container px-5 py-16 md:py-12   flex flex-wrap justify-center mx-auto">
                <div class="flex flex-col text-center w-full mb-4 ">
                    <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">ROOF PARTY POLAROID</h2>
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Master Cleanse Reliac Heirloom</h1>
                    <p class=" lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
                </div>
            </div>
        <EventCard type="Category" title="Titulo del evento" date="23 Jun 2021" content="Glossier echo park pug,  sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. "/> 
            
        <EventCard type="Category" title="Titulo del evento" date="23 Jun 2021" content="contenido del evento"/> 
            Events Component
        </>
    );
}

export default Events;