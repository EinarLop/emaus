import Post from '../firebase/posts'
import { Link } from "react-router-dom";

const BlogCard = (props) => {

    const textStyle = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 5,
        WebkitBoxOrient: "vertical"
    }

    const { title, content, image, posted } = props.postInfo;
    const imageUrl = image === '' ? Post.defaultImage : image;
    const date = posted.toDate();
    const mm = date.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
    const dd = date.getDate();
    const yyyy = date.getFullYear();
    const dateString = mm + ' ' + dd + ', ' + yyyy;

    return (
        <>
            <div class=" xl:w-1/4 md:w-1/2 p-0 sm:p-4 sm:py-4 py-4  max-w-sm ">
                <div class=" bg-gray-100 p-6 rounded-lg">
                    <img class="h-40 rounded w-full object-cover object-center mb-6" src={imageUrl} alt="fotografia" />
                    <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">{dateString}</h3>
                    <h2 class="text-lg text-gray-900 font-medium title-font mb-4">{title}</h2>
                    <p class="leading-relaxed text-base" style={textStyle}>{content}</p>
                    <Link to={"/blogpost/" + props.id} class="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0 my-4">Leer Más
                    </Link>
                </div>
            </div>
        </>
    );
}

export default BlogCard;