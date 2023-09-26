import "./App.css";
import Header from "./components/Header";
import Game from "./components/Game";
import { useState, useEffect } from "react";
import { getAllPokemons } from "./utils/pokemon";
import Modal from "./components/Modal";

function App() {
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemonsArray, setPokemonsArray] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);

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
    console.log(pokemonArr);
  };

  const startGame = () => {
    getPokemonsArr();
    setIsStart(false);
  };

  const endGame = () => {
    setIsEnd(false);
    setIsStart(true);
  };

  return (
    <>
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        <>
          {isStart && (
            <Modal
              title={"WELCOME!"}
              message={"Choose a difficulty:"}
              buttons={[
                { name: "easy", onClick: startGame },
                { name: "hard", onClick: startGame },
              ]}
            />
          )}
          {isEnd && (
            <Modal
              title={"GAME OVER!"}
              message={"score:0 best score:0"}
              buttons={[{ name: "restart", onClick: endGame }]}
            />
          )}
          <Header />
          <Game
            pokemons={pokemonsArray}
            allPokemons={allPokemons}
            getPokemonsArr={getPokemonsArr}
            setIsEnd={setIsEnd}
          />
        </>
      )}
    </>
  );
}

export default App;
