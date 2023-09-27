import { useState } from "react";
import Card from "./Card";

const Game = ({
  pokemons,
  allPokemons,
  getPokemonsArr,
  setIsEnd,
  score,
  bestScore,
  setScore,
  setBestScore,
}) => {
  const [flip, setFlip] = useState(false);

  const handleClick = id => {
    setFlip(prev => !prev);

    const clickedPokemon = allPokemons.find(poke => poke.id === id);

    if (clickedPokemon.isClicked === true) {
      if (score > bestScore) setBestScore(score);
      setIsEnd(true);
    } else {
      clickedPokemon.isClicked = true;
      setScore(prev => prev + 1);
      if (score === 11) {
        setBestScore(12);
        setIsEnd(true);
      } else {
        const clickedPokemons = [];
        allPokemons.filter(poke => {
          if (poke.isClicked === true) clickedPokemons.push(poke);
        });
        getPokemonsArr([...clickedPokemons]);
      }
    }

    setTimeout(() => {
      setFlip(prev => !prev);
    }, 500);
  };

  return (
    <main>
      {pokemons.map(poke => {
        return (
          <Card
            key={poke.id}
            poke={poke}
            handleClick={handleClick}
            flip={flip}
          />
        );
      })}
    </main>
  );
};
export default Game;
