import { useState, useEffect } from 'react'
import BlogCard from "../Components/BlogCard"
import { Link } from "react-router-dom";
import BlogCardAdmin from "../Components/BlogCardAdmin"
import Page from '../firebase/pages'
import Post from '../firebase/posts'

const BlogAdmin = () => {
    const [content, setContent] = useState({
        mainTitle: "Titulo",
        mainKicker: "mainKicker",
        mainDescription: "Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag",
    })

    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            console.log("Fetching events data...");
            const posts = await Post.getAllPosts();
            setPostList(posts);
            setLoading(false);
        }
        async function fetchPage() {
            console.log("Fetching Blog page info...");
            const pageData = await Page.getBlog();
            setContent(pageData);
        }
        fetchPage();
        fetchData();
    }, [])

    const handleOnChange = (event) => {
        setContent({
            ...content,
            [event.target.align]: event.target.textContent,
        });
    }

    const handleOnSubmit = async () => {
        // Updates Page Content
        const res = await Page.updateBlog(content);
        console.log(res);
    }


    /////////////////////////Fav and delete blog/////////////////////////

    const onDelete = async (index, postId) => {
        console.log("Deleting comment", index);
        let res = await Post.deletePost(postId);
        console.log(res);
        let newBlogs = postList.filter((blog, blog_index) => blog_index !== index);
        setPostList(newBlogs);
    }

    const setFav = async (index, postId) => {
        // Call Post.update()
        let newBlogs = [...postList]
        console.log(newBlogs[index], "favorite: ", newBlogs[index].favorite);

        let value = !newBlogs[index].favorite;
        newBlogs[index].favorite = value;
        let res = await Post.updatePost(postId, { favorite: value });
        console.log(res);
        setPostList(newBlogs)
    }

    /////////////////////////Fav and delete blog/////////////////////////
    return (
        <>
            <div class="bg-blue-300 flex flex-col text-center w-full mb-4 p-4">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Administración del contenido de Página de Inicio</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-xl">Usted se encuentra en modo de edición. Escriba sobre las entradas de texto y presione guardar cambios cuando termine para actualizar el contenido.</p>
                <div class="w-full flex justify-center my-8">

                    <button class="text-white bg-indigo-500 border-0 py-4 px-10 focus:outline-none hover:bg-indigo-600 rounded text-lg"> <Link to="/admin/crear/blog"> Crear entrada de blog </Link> </button>

                </div>
            </div>
            <div class="flex flex-wrap justify-center mx-auto p-4">
                <div class="flex flex-col text-center w-full mb-4 ">
                    <h2 contenteditable="True" onBlur={handleOnChange} align="mainKicker" class="text-xs  h-auto text-indigo-500 tracking-widest font-medium title-font mb-1 focus:bg-blue-100 focus:outline-none">{content.mainKicker}</h2>
                    <h1 contenteditable="True" onBlur={handleOnChange} align="mainTitle" class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 focus:bg-blue-100 focus:outline-none">{content.mainTitle}</h1>
                    <p contenteditable="True" onBlur={handleOnChange} align="mainDescription" class="lg:w-2/3 mx-auto leading-relaxed text-base focus:bg-blue-100 focus:bg-blue-100 focus:outline-none">{content.mainDescription}</p>
                </div>


                {/* MIN 200 chars*/}
                {
                    loading ? <p>Cargando Eventos...</p>
                        :
                        (postList.length ?
                            // <div class="flex flex-wrap justify-center mx-auto p-4">
                            <div class="flex flex-wrap justify-center w-screen p-4">
                                {postList.map((post, index) => (
                                    <BlogCardAdmin
                                        setFav={() => setFav(index, Post.id)}
                                        key={index}
                                        delete={() => onDelete(index, post.id)}
                                        postInfo={post}
                                    />))}
                            </div>
                            : (<p>No hay eventos planeados</p>)
                        )}
            </div>




            <div class="w-full flex justify-center my-20">
                <button class="text-white bg-green-500 border-0 py-4 px-10 focus:outline-none hover:bg-green-600 rounded text-lg" onClick={handleOnSubmit}>Guardar cambios</button>
            </div>
        </>
    );
}

export default BlogAdmin;

// title: clientData.title,
//         content: clientData.content,
//         favorite: clientData.favorite || false,
//         posted: firebase.firestore.Timestamp.fromDate(new Date()),      // Timestamp is more lightweight than Date
//         image: 