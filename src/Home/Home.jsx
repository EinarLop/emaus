import Slider from "../Components/Slider"
import BlogCard from "../Components/BlogCard"
import BlogCardAdmin from "../Components/BlogCardAdmin"
import { useState } from "react"



const Home = () => {

    const [blogs, setBlogs] = useState([
        {
            title: "OneGiselle",
            description: "OneD",
            favorite: true,
        },

        {
            title: "Two",
            description: "TwoD",
            favorite: false,
        },

        {
            title: "Three",
            description: "ThreeD",
            favorite: false,
        },



    ])

    const onDelete = (index) => {
        console.log("Deleting comment", index);
        let newBlogs = blogs.filter((blog, blog_index) => blog_index !== index);
        setBlogs(newBlogs);
    }



    const setFav = (index) => {
        let newBlogs = [...blogs]
        console.log(newBlogs[index])
        newBlogs[index].favorite = !newBlogs[index].favorite

        setBlogs(newBlogs)
        console.log(blogs[index])

    }


    return (
        <>
            <section class=" sm:p-8 text-gray-600 body-font p-4  ">
                <div class="flex flex-col text-center w-full mb-8">
                    <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">ROOF PARTY POLAROID</h2>
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Master Cleanse Reliac Heirloom</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
                </div>
                <Slider />

                <div class="flex flex-col text-center w-full mt-12 mb-8">
                    <h1 class="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Master Cleanse Reliac Heirloom</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
                </div>

                <div class="flex flex-wrap justify-center mx-auto ">


                    {blogs.map((blog, index) => {
                        return (


                            <>
                                <BlogCardAdmin setFav={() => setFav(index)} key={index} fav={blog.favorite} delete={() => onDelete(index)} subtitle="ARCHANA" title="Hola amixes" summary="Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris labori labori" />


                            </>
                        )
                    })}


                    {/* 
                    <BlogCard subtitle="ARCHANA" title="Hola amixes" summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris laboris l exercitation ullamco laboris  ullamco laboris  ullamco laboris " />


                    <BlogCard subtitle="ARCHANA" title="Hola amixes" summary="Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris labori labori" />*/}
                </div>
            </section>






        </>
    );
}

export default Home;