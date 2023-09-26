import { useState } from "react";
import Card from "./Card";
import Scoreboard from "./Scoreboard";

const Game = ({ pokemons, allPokemons, getPokemonsArr, setIsEnd }) => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const handleClick = id => {
    const clickedPokemon = allPokemons.find(poke => poke.id === id);

    if (clickedPokemon.isClicked === true) {
      console.log("you lose");
      if (score > bestScore) setBestScore(score);
      setIsEnd(true);
      setScore(0);
    } else {
      clickedPokemon.isClicked = true;
      setScore(prev => prev + 1);
      // shufflePokemons();
      const clickedPokemons = [];
      allPokemons.filter(poke => {
        if (poke.isClicked === true) clickedPokemons.push(poke);
      });

      getPokemonsArr([...clickedPokemons]);
    }
  };

  return (
    <main>
      <Scoreboard score={score} bestScore={bestScore} />
      {pokemons.map(poke => {
        return <Card key={poke.id} poke={poke} handleClick={handleClick} />;
      })}
    </main>
  );
};
export default Game;
