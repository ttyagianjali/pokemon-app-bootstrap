let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    pokemonList.classList.add('list-group');
    let listpokemon = document.createElement('li');
    listpokemon.classList.add('group-listitem');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn-primary');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
  }

    function loadList() {
      return fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          return json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
            console.log(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  
    function showDetails(pokemon) {
      let pokemonModal = document.querySelector('#pokemonModal');

      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.name = details.name;
        })
        .catch(function (e) {
          console.error(e);
        });
    }

    function showModal(pokemon) {
      let modal = document.querySelector('.modal');
      let nameElement = document.createElement('p');
      nameElement.innerText = `Name: ${pokemon.name}`;
      let heightElement = document.createElement('p');
      heightElement.innerHTML = `Height:  ${pokemon.height}`;
      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;

      modal.appendChild(nameElement);
      modal.appendChild(heightElement);
      modal.appendChild(imageElement);

      modal.classList.add('is-visible');
    }
  
    function hideModal() {
      let modalContainer = document.querySelector('#pokemon-modal');
      modalContainer.classList.remove('is-visible');
    }
  

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  
})();
  
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
