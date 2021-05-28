import { useState, useEffect } from "react"
import VolunteerCard from "./VolunteerCard"
import Volunteer from '../firebase/volunteers'
import useLogin from '../hooks/useLogin'

const VolunteerAdmin = () => {

  const { loginStatus } = useLogin();
  const [volunteers, setVolunteers] = useState([])
  
  useEffect(() => {
    async function fetchVolunteers() {
      const data = await Volunteer.getAllVolunteers();
      console.log(data);
      setVolunteers(data);
    }

    fetchVolunteers();
  }, [])

  const onDelete = async (index, volunteerId) => {
    console.log("Deleting comment", index);
    let newVolunteers = volunteers.filter((volunteer, volunteer_index) => volunteer_index !== index);
    setVolunteers(newVolunteers);
    let res = await Volunteer.deleteVolunteer(volunteerId);
    console.log(res);
  }



  return (
    <>
      {loginStatus ? (
        <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">

          <h1 class="text-3xl font-medium title-font text-gray-900  text-center">Aplicaciones voluntariado</h1>


          <div class="p-4 max-w-screen-lg w-full mx-auto">

            {volunteers.length ? volunteers.map((volunteer, index) => {
              return (
                <VolunteerCard
                  date={volunteer.date}
                  volunteerInfo={volunteer}
                  delete={() => onDelete(index, volunteer.volunteerId)
                  }
                />
              )
            }) : <p>Por el momento no hay registros de voluntarios.</p>}


          </div>

        </div>
      </section>
      ) : 
      (
        <div style={{display: 'flex', justifyContent:'center'}}>
          <h1 style={{textAlign:'center'}}>404 Ruta no encontrada</h1>
        </div>
      )}
    </>

  )

}

export default VolunteerAdmin