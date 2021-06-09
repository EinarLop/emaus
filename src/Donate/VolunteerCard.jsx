const VolunteerCard = (props) => {

  const date = props.date.toDate()
  const mm = date.toLocaleString('es-ES', { month: 'long' });
  const dd = date.getDate();
  const yyyy = date.getFullYear();
  const dateString = mm + " " + dd + " " + yyyy;

  const { name, email, phone, note } = props.volunteerInfo;

  return (

    <div class="h-full bg-gray-100 p-8 rounded my-12">

      <div class="flex flex-col">
        <div class="flex justify-between mb-2.5 align-center">
          <p class="title-font self-center font-medium  ml-1 text-2xl text-gray-900">{name}</p>
          <button onClick={props.delete} class="focus:outline-none self-center bg-red-500 w-12 mh-2 mh-12 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">X</button>

        </div>
        <p class="title-font text-gray-500 mb-1.5  ml-1 italic"> {dateString}</p>
        <span class="text-gray-500 mb-1.5 text-md"> <svg class="w-6 mr-2 fill-current text-gray-500  inline-block" viewBox="0 0 20 20">
          <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
        </svg>{email}</span>
        <span class="text-gray-500 mb-2.5 text-md"> <svg class="w-6 mr-2 fill-current text-gray-500  inline-block" viewBox="0 0 20 20">
          <path d="M14.911,1.295H5.09c-0.737,0-1.339,0.603-1.339,1.339v14.733c0,0.736,0.603,1.338,1.339,1.338h9.821c0.737,0,1.339-0.602,1.339-1.338V2.634C16.25,1.898,15.648,1.295,14.911,1.295 M15.357,17.367c0,0.24-0.205,0.445-0.446,0.445H5.09c-0.241,0-0.446-0.205-0.446-0.445v-0.893h10.714V17.367z M15.357,15.58H4.644V4.42h10.714V15.58z M15.357,3.527H4.644V2.634c0-0.241,0.205-0.446,0.446-0.446h9.821c0.241,0,0.446,0.206,0.446,0.446V3.527z"></path>
        </svg>{phone}</span>







      </div>
      <p class="leading-relaxed text-md ">{note}</p>

    </div>



  )



}

export default VolunteerCard