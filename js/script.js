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
          // console.log(pokemon);
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //loads some details inside the pokemon objects: pokemon > detailsUrl > details. then map these details to item.height, item.types, etc.
  //the item parameter will be refering to the individual pokemon objs

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //adds preview image
        pokemon.previewImageUrl = details.sprites.front_default;

        //adds front image
        pokemon.imageUrl =
          details.sprites.other["official-artwork"].front_default;
        //adds back image
        pokemon.imageUrlBack =
          details.sprites.other["official-artwork"].front_shiny;

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
    let pokemonUl = document.querySelector(".list-group");
    //creates li and button (button goes inside the li)
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    button = document.createElement("button");
    button.classList.add("btn", "btn-primary");

    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");

    //creates image preview
    let imgPreview = document.createElement("img");
    imgPreview.classList.add("img-preview");

    for (let i = 0; i < pokemonList.length; i++) {
      imgPreview.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;
    }

    //listens for click, then calls function when clicked
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
    // sets button text to the name of the pokemon
    button.innerText = pokemon.name;
    //styling of the button
    button.appendChild(imgPreview);
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

//creates popup window with pokemon name and details
const modalBody = document.querySelector(".modal-body");
const modalTitle = document.querySelector(".modal-title");

function showModal(pokemon) {
  //clears modal container if it had anything inside
  modalBody.innerHTML = "";
  modalTitle.innerHTML = "";

  let modalPokemonTitle = document.createElement("div");
  modalPokemonTitle.innerText = pokemon.name;

  let modalPokemonImgWrapper = document.createElement("div");
  modalPokemonImgWrapper.classList.add("modal-items", "card");

  //front img
  let modalPokemonImg = document.createElement("img");
  modalPokemonImg.classList.add("modal-img", "card-side");
  modalPokemonImg.src = pokemon.imageUrl;
  //back img
  let modalPokemonImgBack = document.createElement("img");
  modalPokemonImgBack.classList.add(
    "modal-img",
    "card-side",
    "card-side--back"
  );
  modalPokemonImgBack.src = pokemon.imageUrlBack;

  //height
  let modalPokemonHeight = document.createElement("p");
  modalPokemonHeight.classList.add("modal-items");
  modalPokemonHeight.innerText = `height: ${pokemon.height / 10} m.`;
  //types
  let modalPokemonTypes = document.createElement("p");
  modalPokemonTypes.classList.add("modal-items");
  modalPokemonTypes.innerText = `type: ${pokemon.types}`;

  //img

  //appendchild

  modalTitle.appendChild(modalPokemonTitle);
  modalBody.appendChild(modalPokemonHeight);
  modalBody.appendChild(modalPokemonTypes);
  modalPokemonImgWrapper.appendChild(modalPokemonImg);
  modalPokemonImgWrapper.appendChild(modalPokemonImgBack);
  modalBody.appendChild(modalPokemonImgWrapper);
}
