import { useState , useEffect } from "react"
import * as petService from "../../services/petService"
import { useParams } from "react-router"


function PetDetail() {
  const [pet , setPet] = useState(null)
const {id} = useParams()


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
    </div>
    
  )
}

export default PetDetail