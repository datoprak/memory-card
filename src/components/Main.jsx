import { useEffect, useState } from "react";
import { getAllPokemons } from "../utils/pokemon";

import Card from "./Card";

const Main = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [firstPokemons, setFirstPokemons] = useState([]);

  useEffect(() => {
    getAllPokemons()
      .then(data => setAllPokemons(data))
      .catch(err => console.log(err, err.message));
  }, []);

  useEffect(() => {
    const getStartingPokemons = () => {
      const showedPokemonsId = [];
      let randomId;
      while (showedPokemonsId.length < 12) {
        randomId = Math.floor(Math.random() * 151 + 1);
        while (!showedPokemonsId.includes(randomId)) {
          showedPokemonsId.push(randomId);
        }
      }
      let showedPokemons = [];
      showedPokemonsId.forEach(rId => {
        allPokemons.forEach(poke => {
          if (poke.id === rId) {
            poke.isShowed = true;
            showedPokemons.push(poke);
          }
        });
      });
      setFirstPokemons(showedPokemons);
    };

    getStartingPokemons();
  }, [allPokemons]);

  const handleClick = id => {
    const clickedPokemon = allPokemons.find(poke => poke.id === id);
    console.log(clickedPokemon);
    if (clickedPokemon.isClicked === true) {
      console.log("you lose");
    } else {
      clickedPokemon.isClicked = true;
      console.log("shufflePokemons()");
    }
  };

  return (
    <main>
      {firstPokemons.map(poke => {
        return <Card key={poke.id} poke={poke} handleClick={handleClick} />;
      })}
    </main>
  );
};
export default Main;
