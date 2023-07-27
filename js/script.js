let pokemonRepository = (function () {
  let pokemonList = [];

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //load list of pokemons from the api url, when/ if loaded calls add() function to push items to pokemonList array
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

  //loads some details inside the pokemon objects: pokemon > detailsUrl > details. then map these details to item.height, item.types, etc.
  //the item parameter will be refering to the individual pokemon objs
  //  |
  //  |
  //  |
  //  |
  //  |
  //  |
  //  |
  //  V
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //adds front image
        pokemon.imageUrl =
          details.sprites.other["official-artwork"].front_default;
        pokemon.height = details.height;

        //adds types to the pokemonTypesArray, which then become accessible through pokemon.types
        let pokemonTypesArray = [];

        details.types.forEach((type) => {
          pokemonTypesArray.push(type.type.name);
        });
        pokemon.types = pokemonTypesArray;
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
      // console.log(pokemon);
      showModal(pokemon);
    });
    // console.log(pokemon.name, pokemon.detailsUrl);
  }

  //adds html element (li & button) to every pokemon of the list
  let button;
  function addListItem(pokemon) {
    let pokemonUl = document.querySelector(".pokemon-list");
    //creates li and button
    let listItem = document.createElement("li");
    button = document.createElement("button");
    button.addEventListener("click", () => {
      modalContainer.classList.add("is-visible");
    });
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
    // pokemonTypesArray: pokemonTypesArray,
  };
})();

pokemonRepository.loadList().then(function () {
  //now data is loaded!

  //generates new li and button itens for each pokemon on the list
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
//  |
//  |
//  |
//  |
//  |
//  |
//  |
//  V
//creates popup window with pokemon name and details
const modalContainer = document.querySelector(".modal-container");
function showModal(pokemon) {
  // loadDetails(pokemon);
  //clears modal container if it had anything inside
  modalContainer.innerHTML = "";

  //creates modal div
  let modal = document.createElement("div");
  modal.classList.add("modal");

  //create close button
  let closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.innerText = "X";
  closeButton.addEventListener("click", () => {
    modalContainer.classList.remove("is-visible");
  });

  //text parts
  let modalPokemonTextContainer = document.createElement("div");
  modalPokemonTextContainer.classList.add("modal-pokemon-text-container");
  //name
  let modalPokemonName = document.createElement("h2");
  modalPokemonName.classList.add("modal-pokemon-name");
  modalPokemonName.innerText = pokemon.name;

  //height
  let modalPokemonHeight = document.createElement("p");
  modalPokemonHeight.classList.add("modal-pokemon-height");
  modalPokemonHeight.innerText = `height: ${pokemon.height} m.`;
  //types
  let modalPokemonTypes = document.createElement("p");
  modalPokemonTypes.classList.add("modal-pokemon-types");
  modalPokemonTypes.innerText = `type: ${pokemon.types}`;

  //img
  let modalPokemonImgContainer = document.createElement("div");
  modalPokemonImgContainer.classList.add("modal-pokemon-img-container");

  let modalPokemonImg = document.createElement("img");
  modalPokemonImg.classList.add("modal-pokemon-img");
  modalPokemonImg.src = pokemon.imageUrl;

  //appendchild
  modalPokemonTextContainer.appendChild(modalPokemonName);
  modalPokemonTextContainer.appendChild(modalPokemonHeight);
  modalPokemonTextContainer.appendChild(modalPokemonTypes);
  modalPokemonImgContainer.appendChild(modalPokemonImg);

  modal.appendChild(closeButton);
  modal.appendChild(modalPokemonTextContainer);
  modal.appendChild(modalPokemonImgContainer);

  modalContainer.appendChild(modal);
}
modalContainer.addEventListener("click", (e) => {
  if (e.target === modalContainer) {
    modalContainer.classList.remove("is-visible");
  }
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
    modalContainer.classList.remove("is-visible");
  }
});
