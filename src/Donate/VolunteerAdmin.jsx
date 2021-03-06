import { useState, useEffect } from "react"
import VolunteerCard from "./VolunteerCard"
import Volunteer from '../firebase/volunteers'
import useLogin from '../hooks/useLogin'
import { Link } from "react-router-dom";
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
          <div class="container px-5 py-2 mx-auto ">
            <div class="p-4 w-full mx-auto max-w-xl ">
              <button class=" mx-auto w-full  text-xl text-color bg-blue-100 border-2 border-blue-100 py-2 px-8 focus:outline-none hover:border-blue-300 rounded text-lg">
                <Link
                  to="/admin/panel"
                > Volver al panel administrativo
                            </Link>
              </button>
            </div>
            <h1 class="text-3xl font-medium title-font text-gray-900  text-center mt-8">Aplicaciones voluntariado</h1>


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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h1 style={{ textAlign: 'center' }}>404 Ruta no encontrada</h1>
          </div>
        )}
    </>

  )

}

export default VolunteerAdmin