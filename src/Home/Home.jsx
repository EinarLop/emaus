import Slider from "../Components/Slider"
import BlogCard from "../Components/BlogCard"
import { useState, useEffect } from "react"
import Post from '../firebase/posts'
import Page from '../firebase/pages'
import useLogin from '../hooks/useLogin'
import {Link} from 'react-router-dom'

const Home = () => {

    const {loginStatus} = useLogin();

    const [content, setContent] = useState({
        mainKicker: "Cargando...",
        mainTitle: "Cargando...",
        mainDescription: "Cargando...",
        featuredBlogsTitle: "Cargando...",
        featuredBlogsDescription: "Cargando...",
    });
    const [loading, setLoading] = useState(true);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            console.log("Fetching favorite events...");
            const posts = await Post.getFavoritePosts();
            setPostList(posts);
            setLoading(false);
        }

        async function fetchHome() {
            console.log("Fetching Home page info...");
            const homeData = await Page.getHome();
            setContent(homeData);
        }

        fetchHome();
        fetchData();
    }, [])

    return (
        <>
            {loginStatus && (<div class="p-4 w-full mx-auto max-w-xl">
                            <button class=" mx-auto w-full  text-xl text-color bg-blue-100 border-2 border-blue-100 py-2 px-8 focus:outline-none hover:border-blue-300 rounded text-lg">
                                <Link
                                    to="/admin/panel"
                                > Volver al panel administrativo
                            </Link>
                            </button>
            </div>)}
            <section class=" sm:p-8 text-gray-600 body-font p-4  ">
                <div class="flex flex-col text-center w-full mb-8">
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
                <Slider />

                <div class="flex flex-col text-center w-full mt-12 mb-8">
                    <h1 class="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">{content.featuredBlogsTitle}</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                        {content.featuredBlogsDescription}
                    </p>
                </div>

                <div>

                    {
                        loading ? <p>Cargando Eventos...</p>
                            :
                            (postList.length ?
                                <div class="flex flex-wrap justify-center mx-auto p-4">
                                    {postList.map((p, i) => (<BlogCard id={p.postId} key={i} postInfo={p} />))}
                                </div>
                                : (<p class="text-center">No hay publicaciones destacadas por el momento.</p>)
                            )
                    }

                </div>
            </section>

        </>
    );
}

export default Home;