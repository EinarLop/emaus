import React, { useState, useEffect } from "react";
import Post from '../firebase/posts'
import { Redirect } from 'react-router-dom'

const BlogCreate = () => {
  const [preview, setPreview] = useState();
  // array for local URL Objects for previewing an image
  const [uploadMsg, setUploadMsg] = useState();
  const [feedbackMsg, setFeedbackMsg] = useState();
  const [file, setFile] = useState();
  const [msg, setMsg] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [blog, setBlog] = useState({
    title: '',
    description: '',
  })

  const checkFileSize = (size) => {
    if (size > 2000000) {
      setMsg("El tamaño de la imagen excede los 2MB, por favor seleccione otra")
      return false
    }

    else {
      setMsg("")
      return true
    }
  }

  const onDeleteFile = () => {
    setPreview()
  }

  useEffect(() => {
    console.log("Reset user msg");
    setMsg("");
  }, [file, blog])

  const onFileSubmit = (e) => {
    // adds the selected file to the files array for preloading
    e.preventDefault();
    let f = e.target.file.files[0];
    console.log(f.size)
    let fileSize = checkFileSize(f.size)
    if (f != null && fileSize) {
      let fpreview = URL.createObjectURL(f);

      setPreview(fpreview);

      console.log("Added", f);
      setFile(f);
      setUploadMsg(<p style={{ color: "#9ccc65" }}>Se añadió archivo: {f.name}</p>);
      e.target.file.value = null; // reset the input
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    const newBlog = {
      ...blog,
      [e.target.name]: e.target.value,
    }
    setBlog(newBlog);
  }

  const onSubmit = async () => {
    console.dir(blog);

    const title = blog.title;
    const description = blog.description;
    let msg = <p>Subiendo publicación...</p>
    setMsg(msg);

    if (title.trim() === '' || description.trim() === '') {
      // feedback message: Favor de llenar los campos
      msg = <p styles={{ color: '#ff0033' }}>Por favor incluye título y descripción</p>
      setMsg(msg);
      return;
    }

    if (title.length > 100) {
      msg = <p styles={{ color: ' #ff0033' }}>El título debe ser menor a 100 carateres.</p>
      setMsg(msg);
      return;
    }

    if (description.length > 800) {
      msg = <p styles={{ color: ' #ff0033' }}>El texto debe ser menor a 800 caracteres</p>
      setMsg(msg);
      return;
    }

    if (file === null) {
      msg = <p styles={{ color: ' #ff0033' }}>Incluye una imagen para tu publicación</p>
      setMsg(msg);
      return;
    }

    const cleanBlogPost = {
      title: title,
      content: description,
      favorite: false,
    }

    const response = await Post.createNewPost(cleanBlogPost);
    console.log(response); //Printear mensjae de exito

    if (response.ok) {
      const responseImg = await Post.addImageToPost(response.id, file);
      console.log(responseImg);
      // change created -> true;
      handleRedirect();
    }
  }

  const handleRedirect = () => {
    console.log("Redirecting...");
    let msg = <p styles={{ fontSize: '24px', color: '#9ccc65' }}>¡Publicación creada exitosamente!</p>
    setMsg(msg);
    setTimeout(() => setRedirect(true), 2000);
  }

  return (
    <>
      {(redirect && <Redirect to="/admin/blog" />)}
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-6 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Crear entrada de blog
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify.
            </p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="title" class="leading-7 text-sm text-gray-600">
                    Título del evento
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleChange}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="description" class="leading-7 text-sm text-gray-600">
                    Descripción del evento
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>

              <form
                class="flex w-full flew-wrap  my-4 items-center justify-center bg-grey-lighter"
                onSubmit={onFileSubmit}
              >
                {/* Select file input */}

                <label class=" w-6/12 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border-2 border-blue cursor-pointer  hover:border-indigo-400  ">
                  <svg
                    class="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span class="mt-2 text-base leading-normal">
                    Select a file
                    </span>
                  <input name="file" type="file" class="hidden" />
                </label>

                {/* Select file input */}

                {/* Preview button */}

                <button
                  class=" p-2 h-full w-6/12 mx-2 leading rounded-lg shadow-lg  border-2  py-2 px-8 focus:outline-none  hover:border-indigo-400  rounded text-lg"
                  type="
                  submit"
                >
                  Vista Previa
                  </button>
                {/* Preview button */}
              </form>
              <div class="flex-column w-full items-center border-2 p-2 mb-10">
                <p > Imagenes seleccionadas</p>
                <img class="mx-auto my-4 border-4 hover:border-red-500" src={preview} onClick={onDeleteFile} />
              </div>
              <div class="p-2 w-full text-center max-w-sm mx-auto">
                {msg}
              </div>
              <div class="p-2 w-full max-w-sm mx-auto">
                <button
                  onClick={onSubmit}
                  class="w-full  text-center text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Crear entrada
                </button>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default BlogCreate;