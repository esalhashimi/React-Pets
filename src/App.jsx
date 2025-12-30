import { useEffect, useState } from 'react'
import * as petService from "./services/petServic"

import './App.css'
import PetList from './components/PetList/PetList'

function App() {
  const [pets , setPets] = useState([])

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

  return <PetList pets={pets}/>
}

export default App
