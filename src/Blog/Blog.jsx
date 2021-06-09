import { useState, useEffect } from 'react'
import Post from '../firebase/posts'
import BlogCard from "../Components/BlogCard"
import Page from '../firebase/pages'
import useLogin from '../hooks/useLogin'
import {Link} from 'react-router-dom'

const Blog = () => {

    const {loginStatus} = useLogin();

    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [content, setContent] = useState({
        mainTitle: "Cargando...",
        mainKicker: "Cargando...",
        mainDescription: "Cargando...",
    });

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


    return (
        <>
            {loginStatus && (
            <div class="p-4 w-full mx-auto max-w-xl">
                            <button class=" mx-auto w-full  text-xl text-color bg-blue-100 border-2 border-blue-100 py-2 px-8 focus:outline-none hover:border-blue-300 rounded text-lg">
                                <Link
                                    to="/admin/panel"
                                > Volver al panel administrativo
                            </Link>
                            </button>
            </div>)}
            <div class="flex flex-wrap justify-center mx-auto p-4">
                <div class="flex flex-col text-center w-full mb-4 ">
                    <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
                        {content.mainKicker}
                    </h2>
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        {content.mainTitle}
                    </h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                        {content.mainDescription}
                    </p>
                </div>

                {
                    loading ? <p class="text-center">Cargando Eventos...</p>
                        :
                        (postList.length ?
                            <div class="flex flex-wrap justify-center mx-auto p-4">
                                {postList.map((p, i) => (<BlogCard id={p.postId} key={i} postInfo={p} />))}
                            </div>
                            : (<p class="text-center">No hay eventos planeados</p>)
                        )
                }
            </div>

        </>
    );
}

export default Blog;