import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import BlogCardAdmin from "../Components/BlogCardAdmin"
import Page from '../firebase/pages'
import Post from '../firebase/posts'
import useLogin from '../hooks/useLogin'


const BlogAdmin = () => {

    const { loginStatus } = useLogin();

    const [content, setContent] = useState({
        mainTitle: "Cargando...",
        mainKicker: "Cargando...",
        mainDescription: "Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag",
    })

    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState("");
    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const posts = await Post.getAllPosts();
            setPostList(posts);
            setLoading(false);
        }
        async function fetchPage() {
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

    const handleRedirect = (message) => {
        console.log("Redirecting...");
        if (!message) {
            message = "¡Página actualizada exitosamente!";
        }
        let msg = <p styles={{ color: '#9ccc65' }}>{message}</p>
        setMsg(msg);
        setTimeout(() => {
            refreshPage();
        }, 2000);
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const handleOnSubmit = async () => {
        // Updates Page Content
        setMsg("");
        setShowButton(false);
        const res = await Page.updateBlog(content);
        console.log(res);
        handleRedirect(res.message);
    }


    const onDelete = async (index, postId) => {
        let newBlogs = postList.filter((blog, blog_index) => blog_index !== index);
        setPostList(newBlogs);
        let res = await Post.deletePost(postId);
        setMsg(res.message);
        console.log("Deleted from firestore result:", res);
    }

    const setFav = async (index, postId) => {
        let newBlogs = [...postList]

        const value = !newBlogs[index].favorite;
        newBlogs[index].favorite = value;

        let res = await Post.updatePost(postId, { favorite: value });
        console.log("Set Fav result:");
        console.dir(res);
        setPostList(newBlogs)
    }

    return (
        <>
            { loginStatus ? (
                <>
                    <div class="bg-blue-300 flex flex-col text-center w-full mb-4 p-4">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Administración del contenido de la página de blog</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-xl">Usted se encuentra en modo de edición. Escriba sobre las entradas de texto y presione guardar cambios cuando termine para actualizar el contenido.</p>
                        <div class="w-full flex justify-center my-8">

                            <button class="text-white bg-indigo-500 border-0 py-4 px-10 focus:outline-none hover:bg-indigo-600 rounded text-lg"> <Link to="/admin/crear/blog"> Crear entrada de blog </Link> </button>

                        </div>


                        <div class="p-4 w-full mx-auto max-w-xl">
                            <button class=" mx-auto w-full  text-xl text-color bg-blue-100 border-2 border-blue-100 py-2 px-8 focus:outline-none hover:border-blue-300 rounded text-lg">
                                <Link
                                    to="/admin/panel"
                                > Volver al panel administrativo
                            </Link>
                            </button>
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
                            loading ? <p class="text-center">Cargando Blogs...</p>
                                :
                                (postList.length ?
                                    <div class="flex flex-wrap justify-center w-screen p-4">
                                        {postList.map((post, index) => (

                                            <BlogCardAdmin
                                                setFav={() => setFav(index, post.postId)}
                                                key={index}
                                                delete={() => onDelete(index, post.postId)}
                                                postInfo={post}
                                            />))}
                                    </div>
                                    : (<p>No hay blogs publicados</p>)
                                )}
                    </div>



                    <div class="w-full flex justify-center my-20">
                        {msg}
                    </div>
                    <div class="w-full flex justify-center my-20">
                        {showButton && (
                            <button class="text-white bg-green-500 border-0 py-4 px-10 focus:outline-none hover:bg-green-600 rounded text-lg"
                                onClick={handleOnSubmit}>
                                Guardar cambios
                            </button>
                        )}
                    </div>
                </>
            ) :
                (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h1 style={{ textAlign: 'center' }}>404 Ruta no encontrada</h1>
                    </div>
                )}
        </>
    );
}

export default BlogAdmin;

// title: clientData.title,
//         content: clientData.content,
//         favorite: clientData.favorite || false,
//         posted: firebase.firestore.Timestamp.fromDate(new Date()),      // Timestamp is more lightweight than Date
//         image: 