import { useState , useEffect } from "react"
import * as petService from "../../services/petService"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router"

function PetDetail(props) {
  const {findPetToUpdate, deletePet} = props
  const [pet , setPet] = useState(null)
const {id} = useParams()
const navigate = useNavigate()


useEffect(
  ()=>{
    const getOnePet = async (id) =>{
      const pet = await petService.show(id)
      setPet(pet)
      console.log(pet)
    }
    if(id) getOnePet(id)
  }, [id]
)

const handleDelete = async ()=>{
  const deletedPet = await petService.deleteOne(id)

  if(deletedPet){
    deletePet(id)
    navigate("/")
  }
  else{
    console.log("Something went wrong!")
  }
}

if(!id){
  return <h1>Loading...</h1>
}

if(!pet){
  return <h1>Loading...</h1>
}

  return (
    <div>
    <h1>PetDetail</h1>
      <h4>Name: {pet.name}</h4> 
      <h4> Age: {pet.age}</h4>
      <p>Breed: {pet.breed}</p>
      <div>
        <Link onClick={()=>{findPetToUpdate(id)}} to={`/pets/${id}/update`}>Edit</Link>
        <br />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
    
  )
}

export default PetDetail