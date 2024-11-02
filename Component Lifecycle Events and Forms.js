import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CharacterList = ({ onSelect }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const publicKey = '<eafa506bb50426c65ee68222dafd4ab9>'; 
      const hash = '<0b4aa801ef7bc9424494baa81b2c6239>'; 
      const url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=${hash}`;
      
      try {
        const response = await axios.get(url);
        setCharacters(response.data.data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
      {characters.map(character => (
        <div key={character.id} onClick={() => onSelect(character.id)} style={{ cursor: 'pointer' }}>
          <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  );
};

const CharacterDetail = ({ characterId }) => {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      const publicKey = '<eafa506bb50426c65ee68222dafd4ab9>'; 
      const hash = '<0b4aa801ef7bc9424494baa81b2c6239>'; 
      const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${publicKey}&hash=${hash}`;
      
      try {
        const response = await axios.get(url);
        setCharacter(response.data.data.results[0]);
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    };

    if (characterId) {
      fetchCharacterDetail();
    }
  }, [characterId]);

  if (!character) return null;

  return (
    <div>
      <h2>{character.name}</h2>
      <p>{character.description || "No description available."}</p>
      <h3>Comics:</h3>
      <ul>
        {character.comics.items.map(comic => (
          <li key={comic.resourceURI}>{comic.name}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const handleSelectCharacter = (id) => {
    setSelectedCharacterId(id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Marvel Comics Characters</h1>
      <CharacterList onSelect={handleSelectCharacter} />
      {selectedCharacterId && <CharacterDetail characterId={selectedCharacterId} />}
    </div>
  );
};

export default App;
