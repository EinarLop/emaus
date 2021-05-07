import {useState, useEffect} from 'react'
import Post from '../firebase/posts'
import BlogCard from "../Components/BlogCard"

const Blog = () => {

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

    return (
        <>
            <div class="flex flex-wrap justify-center mx-auto p-4">
                <div class="flex flex-col text-center w-full mb-4 ">
                    <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">ROOF PARTY POLAROID</h2>
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Master Cleanse Reliac Heirloom</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
                </div>

                {/* MIN 200 chars*/}
                {
            loading ? <p>Cargando Eventos...</p>
            : 
            (postList.length ? 
                <div class="flex flex-wrap justify-center mx-auto p-4">
                    {postList.map((p, i) => (<BlogCard key={i} postInfo={p}/>))}
                </div>
                : (<p>No hay eventos planeados</p>)
            )}
            </div>

        </>
    );
}

export default Blog;