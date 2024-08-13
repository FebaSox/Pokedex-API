import { useState, useEffect } from "react";
import React from "react";
const PokePage = () => {
  const [count, setCount] = useState([]);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    );
    then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
      setCount(data);
    });
  }, []);
  return (
    <div>
      {" "}
      {photos.map((photo) => (
        <img key={photo.id} src={photo.url} alt={photo.title} width={100} />
      ))}{" "}
    </div>
  );
};

export default PokePage;
