let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // fetches the promise from API,
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        // returns parsed data
        return response.json();
        // callback for second promise, which gets the desired data
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          //logs all pokemon details in console
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // validates pokemon, then pushes to pokemonList
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon is not correct');
    }
  }

  //function to access pokemonList
  function getAll() {
    return pokemonList;
  }

  //creates button with event listener
  function addListItem(pokemon) {
    let pokemonList = $('.pokemon-list');
    let listItem = $('<li></li>');
    listItem.addClass('list-group-item', '');
    let button = $('<button>' + pokemon.name + '</button>');
    button.addClass('btn', 'btn-primary');
    button.attr('data-toggle', 'modal');
    button.attr('data-target', '#pokemon-modal');
    listItem.append(button);
    pokemonList.append(listItem);
    button.on('click', function (event) {
      showDetails(pokemon);
    });
  }

  //shows pokemon details in a modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    let imageElement = $('<img class="modal-image" style="width:50%">');
    imageElement.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
    let typesElement = $('<p>' + 'Types: ' + pokemon.types.toString() + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  //fetches specific details of pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types.map((item) => item.type.name);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // external access to functions
  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// updates pokemonList from API
pokemonRepository.loadList().then(function () {
  // buttons created forEach in addListItem
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
