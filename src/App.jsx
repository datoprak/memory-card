import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { getAllPokemons } from "./utils/pokemon";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);

  useEffect(() => {
    getAllPokemons()
      .then(data => setAllPokemons(data))
      .catch(err => console.log(err, err.message));
  }, []);

  return (
    <>
      <Header />
      <Main />
      {allPokemons.length < 1 ? (
        <div>loading</div>
      ) : (
        <div>
          {allPokemons.map(poke => {
            return (
              <div key={poke.id}>
                {poke.id} {poke.name}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
