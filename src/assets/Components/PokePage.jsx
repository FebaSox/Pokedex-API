import React, { useState, useEffect } from 'react';

const PokePage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState([]);
  const [weaknessFilter, setWeaknessFilter] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then(response => response.json())
      .then(data => setPokemon(data.pokemon));
  }, []);

  const allTypes = [...new Set(pokemon.flatMap(p => p.type))];
  const allWeaknesses = [...new Set(pokemon.flatMap(p => p.weaknesses))];

  const handleTypeFilter = (type) => {
    setTypeFilter(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleWeaknessFilter = (weakness) => {
    setWeaknessFilter(prev => 
      prev.includes(weakness) ? prev.filter(w => w !== weakness) : [...prev, weakness]
    );
  };

  const filteredPokemon = pokemon.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (typeFilter.length === 0 || typeFilter.every(type => p.type.includes(type))) &&
    (weaknessFilter.length === 0 || weaknessFilter.every(weakness => p.weaknesses.includes(weakness)))
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search Pokémon" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div>
        <h3>Filter by Type:</h3>
        {allTypes.map(type => (
          <label key={type}>
            <input 
              type="checkbox" 
              checked={typeFilter.includes(type)}
              onChange={() => handleTypeFilter(type)}
            />
            {type}
          </label>
        ))}
      </div>

      <div>
        <h3>Filter by Weakness:</h3>
        {allWeaknesses.map(weakness => (
          <label key={weakness}>
            <input 
              type="checkbox" 
              checked={weaknessFilter.includes(weakness)}
              onChange={() => handleWeaknessFilter(weakness)}
            />
            {weakness}
          </label>
        ))}
      </div>

      <div className="pokemon-list">
        {filteredPokemon.map(p => (
          <div key={p.id} className="pokemon-card">
            <h2>{p.name}</h2>
            <p>Number: {p.num}</p>
            <p>Type: {p.type.join(', ')}</p>
            <p>Weaknesses: {p.weaknesses.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokePage;