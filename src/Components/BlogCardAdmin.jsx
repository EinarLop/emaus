import Post from '../firebase/posts'

const BlogCardAdmin = (props) => {

  const {title, content, image, posted, favorite} = props.postInfo;
  const imageUrl = image === '' ? Post.defaultImage : image;
  const date = posted.toDate();
  const mm = date.toLocaleString('es-ES', {month:'long'}).toUpperCase();
  const dd = date.getDate();
  const yyyy = date.getFullYear();
  const dateString = mm + ' ' + dd + ', ' + yyyy;

  const favButtonClass = favorite ? 
                        "bg-yellow-500 w-12 focus:outline-none hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mb-4" 
                        : "bg-gray-500 w-12 focus:outline-none hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mb-4";


  const textStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical"
  }


  return (
    <>
      <div class=" xl:w-1/4 md:w-1/2 p-0 sm:p-4 sm:py-4 py-4  max-w-sm ">
        <div class=" bg-gray-100 p-6 rounded-lg">

          <div class="flex justify-between">
            <button onClick={props.delete} class="focus:outline-none bg-red-500 w-12 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4">X</button>
            <button onClick={props.setFav} class={favButtonClass}>★</button>
          </div>

          <img class="h-40 rounded w-full object-cover object-center mb-6" src={imageUrl} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">{dateString}</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">{title}</h2>
          <p class="leading-relaxed text-base" style={textStyle}>{content}</p>
          <a class="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0 my-4">Learn More

                  </a>
        </div>


      </div>
    </>
  );
}

export default BlogCardAdmin;