import { useEffect, useState } from 'react'
import { Routes , Route} from 'react-router'

import './App.css'

//Services
import * as petService from "./services/petService"



//Components
import PetList from './components/PetList/PetList'
import PetDetail from './components/PetDetail/PetDetail'
import PetForm from './components/PetForm/PetForm'
import { Link } from 'react-router';

import EditPetForm from './components/V2/EditPetForm/EditPetForm'

function App() {
  const [pets , setPets] = useState([])
  const [petToUpdate , setPetToUpdate] = useState(null)

  // We only want to fetch the pets list
  // Once when the component first mounts
  useEffect(()=>{
    const getAllPets = async () =>{
      try{
      const data = await petService.index()
      setPets(data)
      }
      catch(error){
        console.log(error)
      }
    }

    getAllPets()
  } , [])

  const updatePets = (pet)=>{
    setPets([...pets , pet])
  }

  const deletePet = (id)=>{
    const newPetList = pets.filter(pet=>{
      return pet._id !== id
    })

    setPets(newPetList)
   
  }

   const updateOnePet = (updatedPet) => {
  const newUpdatedPetList = pets.map((onePet) => {
    return onePet._id === updatedPet._id ? updatedPet : onePet;
  });
  setPets(newUpdatedPetList);
};

    // this function just used to determine what pet in the detail page i clicked on
  const findPetToUpdate = (petId) =>{
    const foundPet = pets.find(pet=>pet._id == petId)
    console.log('Found Pet', foundPet)
    setPetToUpdate(foundPet)

  }

  return (
    <>
    <div>
      <Link to="/">Home</Link> | {" "}
      <Link to="/pets/new">Creat Pet</Link>
    </div>
      <Routes>
        {/* EJS Style */}
        <Route path='/' element={<PetList pets={pets}/>} />
        {/* <Route path='/' element={<PetListV2/>} /> */}
        <Route path='/pets/:id' element={<PetDetail findPetToUpdate={findPetToUpdate} deletePet={deletePet}/>} />
        <Route path='/pets/new' element={<PetForm updatePets={updatePets}/>} />
        <Route path='/pets/:id/update' element={<PetForm petToUpdate={petToUpdate} updatePets={updatePets} updateOnePet={updateOnePet}/>} />
      {/* Lift Sate Style */}
      </Routes>
      
  </>
)
}

export default App
