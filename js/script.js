let pokemonList = [];
pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
  { name: "Ivysaur", height: 1.2, types: ["grass", "poison"] },
  { name: "Charmander", height: 0.6, types: ["fire"] },
  { name: "Squirtle", height: 0.5, types: ["water"] },
];

pokemonList.forEach(function (item) {
  let pokemonInfo = item.name + `  (height: ${item.height})`;
  let bigPokemon = "  -wow thats big!";

  if (item.height > 1) {
    document.write(`<p>` + pokemonInfo + bigPokemon + `</p>`);
  } else {
    document.write(`<p>` + pokemonInfo + `</p>`);
  }
});
