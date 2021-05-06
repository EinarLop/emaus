import Event from '../firebase/events'

const EventCard = (props) => {

    const {title, content, date, image} = props.eventInfo;
    const mm = date.toLocaleString('es-ES', {month:'short'}).toUpperCase();
    const dd = date.getDate();

    return (
    <section class="text-gray-600 body-font overflow-hidden ">
        <div class="container  px-5 py-16 md:py-12 mx-auto ">
            <div class=" -my-8 lg:mx-6 divide-gray-100 shadow-md border  bg-gray-100 p-6 rounded-lg">
                <div class="p-4 xl:p-8 flex flex-wrap md:flex-nowrap ">
                    <div class=" w-0 invisible  md:visible md:w-20 md:p-4 justify-items-center ">
                        {/* FECHA DE TARJETA: MES ABREVIADO Y DÍA*/}
                        <h2 class="text-base font-medium text-gray-900  mb-1 border-b-2 uppercase text-left xl:text-xl">{mm}</h2>
                        <h2 class="text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-900 text-center ">{dd}</h2>
                      

                    </div>
                    <div class="  w-full pt-2 pl-2 pr-2 h-3/4 md: p-4  flex flex-wrap  md:flex-nowrap">
                       

                       <img alt="evento" class=" rounded  container mx-auto " style={{objectFit:'cover'}} src={image === '' ? Event.defaultImage : image}/>
                   </div>
                    <div class=" p-4 w-full md:flex-wrap xl:tracking-wide ">
                        <span class="font-light text-xs xl:text-sm  text-gray-700 uppercase">{props.type}</span> 
                        <h2 class="text-2xl xl:text-4xl font-medium text-gray-900  mb-2 xl:mb-3 xl:mt-1">{title}</h2>
                        <span class="mt-1  text-gray-500 text-sm xl:text-base  ">{null}</span>
                        
                        <p class=" leading-relaxed xl:text-xl xl:mt-2">{content}</p>

                        <a class="text-indigo-500 xl:text-lg inline-flex items-center mt-4">Learn More
                            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                        
                    </div>




                </div>
            </div>
        </div>
    </section>
    );
}

// https://dummyimage.com/400x400

export default EventCard;
