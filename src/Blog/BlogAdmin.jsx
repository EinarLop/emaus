import { useState, useEffect } from 'react'
import Post from '../firebase/posts'
import BlogCard from "../Components/BlogCard"

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
        fetchData();
    }, [])

    const handleOnChange = (event) => {
        setContent({
            ...content,
            [event.target.align]: event.target.textContent,
        });
    }

    return (
        <>
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
                                {postList.map((p, i) => (<BlogCard key={i} postInfo={p} />))}
                            </div>
                            : (<p>No hay eventos planeados</p>)
                        )}
            </div>

        </>
    );
}

export default BlogAdmin;