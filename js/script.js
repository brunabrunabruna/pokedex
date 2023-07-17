let pokemonList = [];
pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
  { name: "Ivysaur", height: 1.2, types: ["grass", "poison"] },
  { name: "Charmander", height: 0.6, types: ["fire"] },
  { name: "Squirtle", height: 0.5, types: ["water"] },
];
let bigPokemon = "wow thats big!";
let pokemonInfo;

for (let i = 0; i < pokemonList.length; i++) {
  pokemonInfo =
    pokemonList[i].name + ` ` + `(height: ${pokemonList[i].height})`;
  if (pokemonList[i].height > 1) {
    document.write(pokemonInfo + bigPokemon + `</br>`);
  } else {
    document.write(pokemonInfo + `</br>`);
  }
}
