import { useState } from "react"
import VolunteerCard from "./VolunteerCard"


const VolunteerAdmin = () => {




  const [volunteers, setVolunteers] = useState(
    [
      {
        name: "one",
        phone: "111111111",
        mail: "one@gmail.com",
        note: "I am number one bitches",
        date: "10/10/2020"
      },

      {
        name: "two",
        phone: "2222222222",
        mail: "two@gmail.com",
        note: "I am number tow bitches",
        date: "10/10/2020"
      }
    ]
  )






  const onDelete = (index) => {
    console.log("Deleting comment", index);
    let newVolunteers = volunteers.filter((volunteer, volunteer_index) => volunteer_index !== index);
    setVolunteers(newVolunteers);
  }



  return (


    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">

        <h1 class="text-3xl font-medium title-font text-gray-900  text-center">Aplicaciones voluntariado</h1>


        <div class="p-4 md:w-1/2 w-full">


          {volunteers.map((volunteer, index) => {
            return (

              <VolunteerCard
                name={volunteer.name}
                date={volunteer.date}
                mail={volunteer.mail}
                phone={volunteer.phone}
                note={volunteer.note}
                delete={() => onDelete(index)}

              />
            )

          })}


        </div>

      </div>
    </section>
  )

}

export default VolunteerAdmin