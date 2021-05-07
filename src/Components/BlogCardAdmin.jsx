const BlogCardAdmin = (props) => {

  const Card = {
    img: props.img,
    title: props.title,
    kicker: props.kicker,
    description: props.description,
    favorite: props.favorite,

  }

  const textStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical"
  }

  console.log(props.fav)
  return (
    <>
      <div class=" xl:w-1/4 md:w-1/2 p-0 sm:p-4 sm:py-4 py-4  max-w-sm ">
        <div class=" bg-gray-100 p-6 rounded-lg">

          <div class="flex justify-between">
            <button onClick={props.delete} class="bg-red-500 w-12 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4">X</button>
            {
              props.fav ? <button onClick={props.setFav} class="bg-yellow-500 w-12 focus:outline-none hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mb-4">★</button>
                : <button onClick={props.setFav} class="bg-gray-500 w-12 focus:outline-none hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mb-4">★</button>
            }

          </div>

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

export default BlogCardAdmin;