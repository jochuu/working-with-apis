#.pokedex

project using [pokeapi](https://pokeapi.co/) to build a web pokedex.

[live demo](https://jochuu.github.io/working-with-apis/)
features:

- desktop and mobile friendly layouts
- pokemon name suggestions and autocomplete on pokemon names on input (click to select, press tab/enter to select top, choose specific suggestion with up/down arrow and press tab or enter to autocomplete)
- returns DEX #, name, type, back and front normal sprites
- returns evolution chain (semi-broken as it uses a different ID to DEX #)

TODO / future features:

- back and front shiny sprites
- region
- location / route (with map)
- evolution chain returns name and sprite
- animations with CSS
- split style.css into multiple files

learning notes:

- getting back information from one async function to another async function requires them to live in an async function together or using .then()
- layouts never get any easier to make
-

technologies used:

- HTML5
- Javascript
- CSS
- npm
