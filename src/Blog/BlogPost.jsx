import React, { useState, useEffect } from "react";
import Post from "../firebase/posts";

const BlogPost = (props) => {
  const [dateString, setDateString] = useState("cargando...");

  useEffect(() => {
    async function fetchPost() {
      const postData = await Post.getOnePost(props.match.params.id);
      setContent(postData.data);
      const date = postData.data.posted.toDate();
      const mm = date.toLocaleString("es-ES", { month: "long" }).toUpperCase();
      const dd = date.getDate();
      const yyyy = date.getFullYear();
      setDateString(mm + " " + dd + ", " + yyyy);
    }
    fetchPost();
  }, []);

  const [content, setContent] = useState({
    title: "cargando...",
    content: "cargando...",
    posted: "cargando...",
    favorite: "cargando...",
    image: "cargando...",
  });

  return (
    <>
      <section class="text-gray-600 body-font">
        {/* {props.match.params.id} */}
        <div class="flex flex-col text-center w-full mb-2 px-4">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            {content.title}
          </h1>
          {/* <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{content.mainKicker}</p> */}
        </div>
        <div class="container px-5 py-8 mx-auto flex flex-col">
          <div class="lg:w-4/6 mx-auto">
            <div class="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                class="object-cover object-center h-full w-full"
                src={content.image}
              />
            </div>

            <div class="flex flex-col sm:flex-row mt-4">
              <div class="sm:w-full sm:py-8  mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p class=" text-justify font-medium leading-relaxed text-lg mb-4">
                  Fecha de publicación:{" "}
                  <b class="text-indigo-500">{dateString}</b>
                </p>
                {/* <p class=" text-justify font-medium leading-relaxed text-lg mb-4">Escrito por: <b class="text-indigo-500">{content.mainAutor}</b></p> */}

                <p class=" text-justify leading-relaxed text-lg mb-4">
                  {content.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
