import Event from '../firebase/events'

const EventCard = (props) => {

    const textStyle = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 5,
        WebkitBoxOrient: "vertical"
    }

    const { title, content, date, image } = props.eventInfo;
    const mm = date.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
    const dd = date.getDate();
    const imageUrl = image === '' ? Event.defaultImage : image

    return (
        <section class="text-gray-600 body-font max-w-screen-md overflow-hidden mx-auto">
            <div class="container  px-5 py-16 md:py-12  ">
                <div class=" -my-8 lg:mx-6 divide-gray-100 shadow-md border  bg-gray-100 
                 rounded-lg">
                    <div class="flex justify-between ml-4 mt-4">
                        <button onClick={props.delete} class="focus:outline-none bg-red-500 w-12 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4">X</button>
                     </div>
                    <div class="px-4 xl:px-1 flex flex-wrap md:flex-nowrap ">
                        <div class=" w-0 invisible  md:visible md:w-20 md:p-4 justify-items-center ">
                            {/* FECHA DE TARJETA: MES ABREVIADO Y DÍA*/}
                            <h2 class="text-lg text-gray-900 font-medium title-font mb-4  mb-0.5 border-b-2 lowercase text-left">{mm}</h2>
                            <h2 class="text-lg text-gray-900 font-medium title-font mb-4 text-center ">{dd}</h2>
                        </div>
                        <div class="w-full justify-center pt-2 pl-2 pr-2 h-3/4 md:p-4  flex flex-wrap  md:flex-nowrap" style={{ maxWidth: "250px" }}>
                            <img alt="evento" class="mx-auto rounded  container " style={{ objectFit: 'cover' }} src={imageUrl} />
                        </div>
                        <div class=" flex flex-col justify-between p-4 w-full md:flex-wrap xl:tracking-wide ">

                            <div>

                                <span class="font-light text-xs xl:text-sm  text-gray-700 uppercase">{props.type}</span>
                                <p class="text-xl text-gray-900 font-semibold  title-font mb-4">{title}</p>
                                <span class="mt-1  text-gray-500 text-sm xl:text-base  ">{null}</span>

                                <p class=" leading-relaxed text-base" style={textStyle}>{content}</p>

                            </div>
                            <div>
                                <a class="text-indigo-500 text-lg xl:text-lg inline-flex items-center mt-4">Learn More
                            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>

                            </div>


                        </div>




                    </div>
                </div>
            </div>
        </section>
    );
}

// https://dummyimage.com/400x400

export default EventCard;
