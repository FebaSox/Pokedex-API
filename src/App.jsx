import { useState, useEffect } from 'react';
import PokePage from './assets/Components/PokePage';
import './App.css';

function App() {
  const [count, setCount] = useState(0)
  //Run names function when page loads
  useEffect(() => {
    names()
  }, [])

  const names = async () => {
const response = await fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');

//store the data into our books var
    setCount(await response.json())
  }

  return (
    <>
      
      
    </>
  )
}

export default App
