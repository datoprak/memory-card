import "./App.css";
import Header from "./components/Header";
import Game from "./components/Game";
import { useState, useEffect } from "react";
import { getAllPokemons } from "./utils/pokemon";
import Modal from "./components/Modal";
import Scoreboard from "./components/Scoreboard";

function App() {
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemonsArray, setPokemonsArray] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    getAllPokemons()
      .then(data => {
        setAllPokemons(data);
        setLoading(false);
      })
      .catch(err => console.log(err, err.message));
  }, []);

  const getPokemonsArr = () => {
    let pokemonArr = allPokemons.filter(poke => poke.isClicked === true);
    let pokemonIdArr = [];
    pokemonArr.forEach(poke => pokemonIdArr.push(poke.id));
    pokemonArr = [];
    let randomId;

    while (pokemonIdArr.length < 12) {
      randomId = Math.floor(Math.random() * 151 + 1);
      while (!pokemonIdArr.includes(randomId)) {
        pokemonIdArr.push(randomId);
      }
    }

    pokemonIdArr.forEach(rId => {
      allPokemons.forEach(poke => {
        if (poke.id === rId) {
          poke.isShowed = true;
          pokemonArr.push(poke);
        }
      });
    });

    pokemonArr.sort(() => Math.random() - 0.5);
    setPokemonsArray(pokemonArr);
  };

  const startGame = () => {
    getPokemonsArr();
    setIsStart(false);
  };

  const endGame = () => {
    allPokemons.forEach(poke => {
      poke.isClicked = false;
      poke.isShowed = false;
    });
    setScore(0);
    setIsEnd(false);
    getPokemonsArr();
  };

  const title = score === 12 ? "YOU WON!" : "GAME OVER!";

  return (
    <>
      {isStart && (
        <Modal
          title={"WELCOME!"}
          message={"Pokemon Memory Card Game"}
          btn={{ name: "Start", onClick: startGame }}
          loading={loading}
        />
      )}
      {isEnd && (
        <Modal
          title={title}
          message={`Score: ${score} Best Score: ${bestScore}`}
          btn={{ name: "Restart", onClick: endGame }}
        />
      )}
      <Header />
      <Scoreboard score={score} bestScore={bestScore} />
      <Game
        pokemons={pokemonsArray}
        allPokemons={allPokemons}
        getPokemonsArr={getPokemonsArr}
        setIsEnd={setIsEnd}
        score={score}
        bestScore={bestScore}
        setScore={setScore}
        setBestScore={setBestScore}
      />
    </>
  );
}

export default App;
