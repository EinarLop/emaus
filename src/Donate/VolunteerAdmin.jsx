import { useState, useEffect } from "react"
import VolunteerCard from "./VolunteerCard"
import Volunteer from '../firebase/volunteers'

const VolunteerAdmin = () => {

  const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
    async function fetchVolunteers() {
      const data = await Volunteer.getAllVolunteers();
      console.log(data);
      setVolunteers(data);
    }

    fetchVolunteers();
  })

  const onDelete = (index) => {
    console.log("Deleting comment", index);
    let newVolunteers = volunteers.filter((volunteer, volunteer_index) => volunteer_index !== index);
    setVolunteers(newVolunteers);
  }



  return (


    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">

        <h1 class="text-3xl font-medium title-font text-gray-900  text-center">Aplicaciones voluntariado</h1>


        <div class="p-4 max-w-screen-lg w-full">

          {volunteers.length ? volunteers.map((volunteer, index) => {
            return (
              <VolunteerCard
                name={volunteer.name}
                date={volunteer.date}
                mail={volunteer.mail}
                phone={volunteer.phone}
                note={volunteer.note}
                delete={() => onDelete(index)
                }
              />
            )
          }) : <p>No volunteers try again later</p>}


        </div>

      </div>
    </section>
  )

}

export default VolunteerAdmin