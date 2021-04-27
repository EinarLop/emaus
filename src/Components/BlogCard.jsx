const BlogCard = (props) => {

    const textStyle = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 5,
        WebkitBoxOrient: "vertical"
    }
    return (
        <>

            <div class=" xl:w-1/4 md:w-1/2 p-4 max-w-sm ">
                <div class=" bg-gray-100 p-6 rounded-lg">
                    <img class="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/720x400" alt="content" />
                    <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">{props.subtitle}</h3>
                    <h2 class="text-lg text-gray-900 font-medium title-font mb-4">{props.title}</h2>
                    <p class="leading-relaxed text-base" style={textStyle}>{props.summary}</p>
                    <a class="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0 my-4">Learn More
             
                    </a>
                </div>
            </div>
        </>
    );
}

export default BlogCard;