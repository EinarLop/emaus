import React, { useState, useEffect } from "react";
import Event from "../firebase/events";

const EventPost = (props) => {
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      const eventData = await Event.getOneEvent(props.match.params.id);
      setContent(eventData.data);

      const date = eventData.data.date.toDate();
      const time = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
      const mm = date.toLocaleString("es-ES", { month: "long" }).toUpperCase();
      const dd = date.getDate();
      const yyyy = date.getFullYear();
      setDateString(mm + " " + dd + ", " + yyyy + " " + time);
    }
    fetchEvent();
  }, [props.match.params.id]);

  const [content, setContent] = useState({
    title: "cargando...",
    content: "cargando...",
    date: "cargando...",
    image: "",
    type: "cargando...",
  });

  return (
    <>
      <section class="text-gray-600 body-font">
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
                src={content.image === "" ? Event.defaultImage : content.image}
              />
            </div>

            <div class="flex flex-col sm:flex-row mt-4">
              <div class="sm:w-full sm:py-8  mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p class=" text-justify font-medium leading-relaxed text-lg mb-4">
                  Fecha del evento:
                  <b class="text-indigo-500"> {dateString}</b>
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

export default EventPost;
