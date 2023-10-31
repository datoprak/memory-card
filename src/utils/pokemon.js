const getAllPokemons = async () => {
  const urls = [];
  for (let i = 1; i < 152; i++) {
    urls.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  }

  const pokes = await Promise.all(
    urls.map(async url => {
      const response = await fetch(url);
      const data = await response.json();
      return new Pokemon(data);
    })
  );

  return pokes;
};

class Pokemon {
  constructor(pokemon) {
    this.id = pokemon.id;
    this.name = pokemon.name;
    this.img = pokemon.sprites.front_default;
    this.isClicked = false;
  }
}

export { getAllPokemons };
