import BlogCard from "../Components/BlogCard"

const Blog = () => {
    return (
        <>


            <div class="flex flex-wrap justify-center mx-auto">
                <div class="flex flex-col text-center w-full mb-4 p-8">
                    <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">ROOF PARTY POLAROID</h2>
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Master Cleanse Reliac Heirloom</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
                </div>

                {/* MIN 200 chars*/}
                <BlogCard subtitle="ARCHANA" title="Hola amixes" summary="Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et iscing elit, sed do eiusmod tempor incididunt ut labore et iscing elit, sed do eiusm." />
                <BlogCard subtitle="ARCHANA" title="Hola amixes" summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris laboris l exercitation ullamco laboris  ullamco laboris  ullamco laboris " />
                <BlogCard subtitle="ARCHANA" title="Hola amixes" summary="Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris labori labori" />
                <BlogCard subtitle="ARCHANA" title="Hola amixes" summary="Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris labori labori" />
                <BlogCard subtitle="ARCHANA" title="Hola amixes" summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris laboris l exercitation ullamco laboris laboris lexercitatio" />
                <BlogCard subtitle="ARCHANA" title="Hola amixes" summary="Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamcoc ullamcoc ullamcoc" />
                <BlogCard subtitle="ARCHANA" title="Hola amixes" summary="Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris labori labori" />

            </div>


        </>
    );
}

export default Blog;