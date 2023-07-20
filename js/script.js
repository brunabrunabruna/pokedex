let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Ivysaur", height: 1.2, types: ["grass", "poison"] },
    { name: "Charmander", height: 0.6, types: ["fire"] },
    { name: "Squirtle", height: 0.5, types: ["water"] },
  ];

  //adds a new pokemon to the end of the list
  function add(newPokemon) {
    if (typeof newPokemon === "object") {
      let newPokemonKeys = Object.keys(newPokemon);
      let pokemonListKeys = Object.keys(pokemonList[0]);

      if (newPokemonKeys.length === pokemonListKeys.length) {
        for (let i = 0; i < newPokemonKeys.length; i++) {
          if (pokemonListKeys.includes(newPokemonKeys[i]) === false) {
            return false;
          }
        }

        pokemonList.push(newPokemon);
      } else {
        console.log("wrong input");
      }
    } else console.log("wrong input");
  }
  //returns whole pokemon list
  function getAll() {
    return pokemonList;
  }

  //logs pokemon name to console
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  //adds html element (li & button) to every pokemon of the list
  function addListItem(pokemon) {
    let pokemonUl = document.querySelector(".pokemon-list");
    //creates li and button
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    //listens for click, then calls function when clicked
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
    // sets button text to the name of the pokemon
    button.innerText = pokemon.name;
    //styling of the button
    button.classList.add("button");

    listItem.appendChild(button);
    pokemonUl.appendChild(listItem);
  }

  //returns all the functions that can be accessed from outside of main function here
  return { add: add, getAll: getAll, addListItem: addListItem };
})();

//adds new pokemon to the list
pokemonRepository.add({ name: "pikachu", height: 0.5, types: ["water"] });
console.log(pokemonRepository.getAll());

//generates new li and button itens for each pokemon on the list
pokemonRepository.getAll().forEach(function (item) {
  pokemonRepository.addListItem(item);
});
