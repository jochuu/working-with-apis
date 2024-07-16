// use API to get all pokemon names (required for autocomplete)
async function getPokemonNames() {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=1025&offset=0`,
    {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET',
      },
    }
  );
  const data = await response.json();
  return data.results.map((pokemon) => pokemon.name);
}

// use API to get all pokemon evolution chains.
// FIX: id in evolution chain does not match to id in getPokemonInfo
async function getEvoChain(id) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/evolution-chain/${id}`,
    {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET',
      },
    }
  );
  const data = await response.json();

  // recursively look through data to get all pokemon names
  function getAllSpeciesNames(data, names = []) {
    if (data.species && data.species.name) {
      names.push(data.species.name);
    }
    if (data.evolves_to && Array.isArray(data.evolves_to)) {
      data.evolves_to.forEach((evolution) => {
        getAllSpeciesNames(evolution, names);
      });
    }
    return names;
  }
  return getAllSpeciesNames(data.chain);
}

// get all information about a pokemon
async function getPokemonInfo(pokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET',
    },
  });
  return response.json();
}

export { getPokemonNames, getEvoChain, getPokemonInfo };
