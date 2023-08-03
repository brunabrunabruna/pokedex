let pokemonRepository = (function () {
  let e = [];
  function t(e) {
    return fetch(e.detailsUrl)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.previewImageUrl = t.sprites.front_default),
          (e.imageUrl = t.sprites.other["official-artwork"].front_default),
          (e.imageUrlBack = t.sprites.other["official-artwork"].front_shiny),
          (e.height = t.height);
        let i = [];
        t.types.forEach((e) => {
          i.push(e.type.name);
        }),
          (e.types = i);
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function i(t) {
    "object" == typeof t && "name" in t && "detailsUrl" in t
      ? e.push(t)
      : console.log("wrong input");
  }
  function n() {
    return e;
  }
  function o(e) {
    t(e).then(function () {
      showModal(e);
    });
  }
  let a;
  return {
    add: i,
    getAll: n,
    loadList: function e() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.results.forEach(function (e, t) {
            i({ id: t + 1, name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadDetails: t,
    addListItem: function e(t) {
      let i = document.querySelector(".list-group"),
        n = document.createElement("li");
      n.classList.add("list-group-item"),
        (a = document.createElement("button")).classList.add(
          "btn",
          "btn-primary"
        ),
        a.setAttribute("data-toggle", "modal"),
        a.setAttribute("data-target", "#pokemonModal");
      let l = document.createElement("img");
      l.classList.add("img-preview"),
        (l.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${t.id}.png`),
        a.addEventListener("click", function () {
          o(t);
        }),
        (a.innerText = t.name),
        a.appendChild(l),
        n.appendChild(a),
        i.appendChild(n);
    },
    showDetails: o,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
const modalBody = document.querySelector(".modal-body"),
  modalTitle = document.querySelector(".modal-title");
function showModal(e) {
  (modalBody.innerHTML = ""), (modalTitle.innerHTML = "");
  let t = document.createElement("div");
  t.innerText = e.name;
  let i = document.createElement("div");
  i.classList.add("modal-items", "card");
  let n = document.createElement("img");
  n.classList.add("modal-img", "card-side"), (n.src = e.imageUrl);
  let o = document.createElement("img");
  o.classList.add("modal-img", "card-side", "card-side--back"),
    (o.src = e.imageUrlBack);
  let a = document.createElement("p");
  a.classList.add("modal-items"), (a.innerText = `height: ${e.height / 10} m.`);
  let l = document.createElement("p");
  l.classList.add("modal-items"),
    (l.innerText = `type: ${e.types}`),
    modalTitle.appendChild(t),
    modalBody.appendChild(a),
    modalBody.appendChild(l),
    i.appendChild(n),
    i.appendChild(o),
    modalBody.appendChild(i);
}