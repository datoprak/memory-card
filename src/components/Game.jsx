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
  const handleClick = id => {
    const clickedPokemon = allPokemons.find(poke => poke.id === id);

    if (clickedPokemon.isClicked === true) {
      console.log("you lose");
      if (score > bestScore) setBestScore(score);
      setIsEnd(true);
    } else {
      clickedPokemon.isClicked = true;
      setScore(prev => prev + 1);
      console.log(`score: ${score}`);
      if (score === 11) {
        console.log("score 12");
        setBestScore(12);
        setIsEnd(true);
      } else {
        console.log("score !== 12");
        const clickedPokemons = [];
        allPokemons.filter(poke => {
          if (poke.isClicked === true) clickedPokemons.push(poke);
        });
        getPokemonsArr([...clickedPokemons]);
      }
    }
  };

  return (
    <main>
      {pokemons.map(poke => {
        return <Card key={poke.id} poke={poke} handleClick={handleClick} />;
      })}
    </main>
  );
};
export default Game;
