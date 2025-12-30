import { Link } from "react-router"
function PetList({pets}) {
  

  return (
    <div>
        <h1>Pet List</h1>
        <div>
        {!pets.length ? (
          <h2>No Pets Yet!</h2>
        ) : (
          <ul>
            {pets.map((onePet) => (
              <li key={onePet._id}>
                <Link to={`/pets/${onePet._id}`}>{onePet.name}</Link>
                
                </li>
            ))}
          </ul>
        )}
        </div>
       
    </div>
  )
}

export default PetList