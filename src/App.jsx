import { useEffect, useState } from 'react'
import * as petService from "./services/petServic"

import './App.css'

function App() {
  const [pets , setPets] = useState([])

  // We only want to fetch the pets list
  // Once when the component first mounts
  useEffect(()=>{
    const getAllPets = async () =>{
      const data = await petService.index()
      setPets(data)
    }

    getAllPets()
  } , [])

  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default App
