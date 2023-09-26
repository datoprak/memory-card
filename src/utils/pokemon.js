const getAllPokemons = async () => {
  const allPokemon = [];
  
  for (let i = 1; i < 152; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    const data = await response.json();
    const pokemon = new Pokemon(data);
    allPokemon.push(pokemon);
  }

  return allPokemon;
};

class Pokemon {
  constructor(pokemon) {
    this.id = pokemon.id;
    this.name = pokemon.name;
    this.img = pokemon.sprites.front_default;
  }
}

export { getAllPokemons };
