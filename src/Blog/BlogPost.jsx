const BlogPost = () => {
    return (
        <>
            <section class="text-gray-600 body-font">
                <div class="flex flex-col text-center w-full mb-2 px-4">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">10 tips para cuidar a un aldulto mayor</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Estos consejos te ayudaran a propocionar el mejor estandar de vida a tus sere queridos</p>
                </div>
                <div class="container px-5 py-8 mx-auto flex flex-col">
                    <div class="lg:w-4/6 mx-auto">
                        <div class="rounded-lg h-64 overflow-hidden">
                            <img alt="content" class="object-cover object-center h-full w-full" src="https://dummyimage.com/1200x500" />
                        </div>

                        <div class="flex flex-col sm:flex-row mt-4">
                            <div class="sm:w-full sm:py-8  mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                                <p class=" text-justify font-medium leading-relaxed text-lg mb-4">Fecha de publicación: <b class="text-indigo-500">16/10/2010</b></p>
                                <p class=" text-justify font-medium leading-relaxed text-lg mb-4">Escrito por: <b class="text-indigo-500">Ana María Castillo</b></p>

                                <p class=" text-justify leading-relaxed text-lg mb-4">Meggings portland fingerstache lyft, post-ironic fixie man bun banh mi umami everyday carry hexagon locavore direct trade art party. Locavore small batch listicle gastropub farm-to-table lumbersexual salvia messenger bag. Coloring book flannel truffaut craft beer drinking vinegar sartorial, disrupt fashion axe normcore meh butcher. Portland 90's scenester vexillologist forage post-ironic asymmetrical, chartreuse disrupt butcher paleo intelligentsia pabst before they sold out four loko. 3 wolf moon brooklyn.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>);
}

export default BlogPost;