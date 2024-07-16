import '../css/cssreset.css';
import '../css/style.css';
import '../css/pokemontypes.css';
import '../css/mobile.css';
import autocomplete from './autocomplete';
import { getPokemonNames, getPokemonInfo, getEvoChain } from './pokeapi';

// calls getPokemonInfo() and getEvoChain() and adds to DOM
// NOTE: maybe this function doesn't need to exist as id from getPokemonInfo doesn't work for getEvoChain
async function combinePokemonInfo(pokemon) {
  const { id, name, cries, sprites, types } = await getPokemonInfo(pokemon);

  // removes all current pokemon info
  clearPokemonInfo();

  // populate divs
  document.getElementsByClassName('pokedex-entry')[0].innerHTML = id;
  document.getElementsByClassName('pokemon-name')[0].innerHTML = name;
  types.forEach((type) => {
    const typeDiv = document.createElement('span');
    typeDiv.classList.add('type');
    typeDiv.classList.add(type.type.name);
    typeDiv.innerHTML = type.type.name;
    document.getElementsByClassName('pokemon-types')[0].appendChild(typeDiv);
  });

  // TODO: add shiny back and front
  const spriteBackNormal = new Image();
  spriteBackNormal.src = sprites.back_default;
  const spriteFrontNormal = new Image();
  spriteFrontNormal.src = sprites.front_default;
  document
    .getElementsByClassName('pokemon-sprites-normal')[0]
    .getElementsByClassName('sprite-back')[0]
    .appendChild(spriteBackNormal);
  document
    .getElementsByClassName('pokemon-sprites-normal')[0]
    .getElementsByClassName('sprite-front')[0]
    .appendChild(spriteFrontNormal);

  // TODO: add cry to DOM
  const cry = new Audio();
  cry.src = cries.latest;

  // evolution information
  const evoChain = await getEvoChain(id);
  let count = 1;
  document.getElementById('evo-chain').innerHTML = '<h3> Evolutions </h3>';
  evoChain.forEach((evo) => {
    const div = document.createElement('div');
    div.innerHTML = `${count}. ${evo}`;
    document.getElementById('evo-chain').appendChild(div);
    count++;
  });
}

// reset the DOM
const clearPokemonInfo = function () {
  const clearNodes = function (element) {
    element.childNodes.forEach((child) => {
      // clear all text nodes
      if (child.nodeType === Node.TEXT_NODE) {
        child.textContent = '';
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        // clear all images
        if (child.tagName === 'IMG') {
          child.remove();
        } else {
          // recursively call for child elements
          clearNodes(child);
        }
      }
    });
  };

  // get .pokemon-info and clear all child nodes
  const pokemonInfoElements = document.querySelectorAll('.pokemon-info');
  pokemonInfoElements.forEach((element) => {
    clearNodes(element);
  });

  // bandaid fix to clear pokemon types (which was missed by clearNodes)
  document.getElementsByClassName('pokemon-types')[0].innerHTML = '';
};

// fetch! button (gets pokemon name from input, calls combinePokemonInfo)
document.getElementById('fetch-pokemon-button').onclick = () => {
  const pokemonName = document.getElementById('pokemon-name-input').value;
  combinePokemonInfo(pokemonName);
};

// autocomplete
getPokemonNames().then((names) => {
  autocomplete(document.getElementById('pokemon-name-input'), names);
});
