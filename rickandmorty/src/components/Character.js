function Character(character) {
  // This lets us use the Bootstrap container layout with a column size of 3 (https://getbootstrap.com/docs/5.0/layout/columns/) and style the Character component as a Bootstrap card component (https://getbootstrap.com/docs/5.0/components/card/)

  return (
    <div className='col-3'>
      <div className='card'>
        <img
          src={character.image}
          alt={character.name}
          className='card-img-top'
        />
        <div className='card-body'>
          <h3 className='card-title'>{character.name}</h3>
          <p>{`Origin: ${character.origin && character.origin.name}`}</p>
        </div>
      </div>
    </div>
  )
}

export default Character;