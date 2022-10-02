import { useEffect, useState } from 'react';
import Character from "./Character";

function List() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch('https://rickandmortyapi.com/api/character');
      const { results } = await data.json();
      setCharacters(results);
      setLoading(false);
    }
    /* The previous method that we used to retrieve information from JSON files using fetch doesn't take into account that the request to this file may fail. If the request fails, the loading state will remain true, meaning that the user will keep seeing the loading indicator. If you want to display an error message when the request doesn't succeed, you'll need to wrap the fetch method inside a try...catch block */
    fetchData();
  }, [characters.length]);

  // The bootstrap setting was already set earlier
  return (
    <div>
      <h2>Characters</h2>
      <div className='row'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          characters.map((character) => (
            <Character 
              key={character.id}
              name={character.name}
              origin={character.origin}
              image={character.image}
            />
          ))
        )
        }
      </div>
    </div>
  )
}

export default List;