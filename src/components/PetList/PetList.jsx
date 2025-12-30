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
              <li key={onePet._id}>{onePet.name}</li>
            ))}
          </ul>
        )}
        </div>
       
    </div>
  )
}

export default PetList