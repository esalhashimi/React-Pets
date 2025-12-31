import { useState } from "react"
import * as petService from "../../services/petService"
import { useNavigate } from "react-router"

function PetForm(props) {
   const { updatePets, petToUpdate, updateOnePet } = props;
    const navigate = useNavigate()
    const [formState , setFormState] = useState(petToUpdate ? petToUpdate :{
        name:"",
        age:0,
        breed:""
    })

    const handleChange = (event)=>{
        const{name,value} = event.target

        
        
        const newFormState = {...formState,[name]:value}

        setFormState(newFormState)
    }

    const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...formState };
    payload.age = Number(payload.age);

    if (petToUpdate) {
        const updatedPet = await petService.update(petToUpdate._id, payload);
        if (updatedPet) {
            updateOnePet(updatedPet); 
            navigate("/");
        }
        return; 
    }

    const newPetCreated = await petService.create(payload);
    if (newPetCreated) {
        updatePets(newPetCreated);
        navigate("/");
    }
};
  return (
    <div>
        <h1>Pet Form</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' id='name' value={formState.name} onChange={handleChange}/>
            
            <label htmlFor="age">Age:</label>
            <input type="number" name='age' id='age' value={formState.age} onChange={handleChange}/>

            <label htmlFor="breed">Breed:</label>
            <input type="text" id='breed' name='breed' value={formState.breed} onChange={handleChange}/>


            <button type='submit'>Save</button>
        </form>
    </div>
  )
}

export default PetForm