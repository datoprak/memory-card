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
