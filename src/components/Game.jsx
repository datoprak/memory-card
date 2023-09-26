import { useEffect, useState } from "react";
import { getAllPokemons } from "../utils/pokemon";

import Card from "./Card";
import Scoreboard from "./Scoreboard";

const Game = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonsArray, setPokemonsArray] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

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
      setPokemonsArray(showedPokemons);
    };

    getStartingPokemons();
  }, [allPokemons]);

  const handleClick = id => {
    const clickedPokemon = allPokemons.find(poke => poke.id === id);
    console.log(clickedPokemon);
    if (clickedPokemon.isClicked === true) {
      console.log("you lose");
      if (score > bestScore) setBestScore(score);
      setScore(0);
    } else {
      clickedPokemon.isClicked = true;
      setScore(prev => prev + 1);
      shufflePokemons();
    }
  };

  const shufflePokemons = () => {
    const newPokemons = [];
    const newPokemonsArray = [];
    allPokemons.forEach(poke => {
      if (poke.isClicked) newPokemons.push(poke.id);
    });
    let randomId;
    while (newPokemons.length < 12) {
      randomId = Math.floor(Math.random() * 151 + 1);
      while (!newPokemons.includes(randomId)) {
        newPokemons.push(randomId);
      }
    }
    newPokemons.forEach(rId => {
      allPokemons.forEach(poke => {
        if (poke.id === rId) {
          poke.isShowed = true;
          newPokemonsArray.push(poke);
        }
      });
    });
    newPokemonsArray.sort(() => Math.random() - 0.5);
    setPokemonsArray(newPokemonsArray);
  };

  return (
    <main>
      <Scoreboard score={score} bestScore={bestScore} />
      {pokemonsArray.map(poke => {
        return <Card key={poke.id} poke={poke} handleClick={handleClick} />;
      })}
    </main>
  );
};
export default Game;
