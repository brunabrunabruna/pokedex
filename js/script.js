let pokemonRepository = (function () {
  let pokemonList = [];

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //load list of pokemons
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //adds details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //adds a new pokemon to the end of the list
  function add(newPokemon) {
    //checks if the new pokemon obj has the same properties as the first pokemon on the list (our default). If it does then it can push
    if (
      typeof newPokemon === "object" &&
      "name" in newPokemon &&
      "detailsUrl" in newPokemon
    ) {
      pokemonList.push(newPokemon);
    } else console.log("wrong input");
  }
  //returns whole pokemon list
  function getAll() {
    return pokemonList;
  }

  //logs pokemon details to console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
    // console.log(pokemon.name, pokemon.detailsUrl);
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
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  //now data is loaded!

  //generates new li and button itens for each pokemon on the list
  pokemonRepository.getAll().forEach(function (item) {
    pokemonRepository.addListItem(item);
  });
});
