let pokemonRepository = (function () {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function n(t) {
    o(t).then(function () {
      console.log(t),
        (function (t) {
          let e = $('.modal-title'),
            n = $('.modal-body');
          e.empty(), n.empty();
          let o = $('<h1>' + t.name + '</h1>'),
            i = $('<img class="modal-image" style="width:50%">');
          i.attr('src', t.imageUrl);
          let l = $('<p>Height: ' + t.height + '</p>'),
            a = $('<p>Weight: ' + t.weight + '</p>'),
            p = $('<p>Types: ' + t.types.toString() + '</p>');
          e.append(o), n.append(i), n.append(l), n.append(a), n.append(p);
        })(t);
    });
  }
  function o(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.other.dream_world.front_default),
          (t.height = e.height),
          (t.weight = e.weight),
          (t.types = e.types.map((t) => t.type.name));
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  return {
    getAll: function () {
      return t;
    },
    addListItem: function (t) {
      let e = $('.pokemon-list'),
        o = $('<li></li>');
      o.addClass('list-group-item', 'list-custom');
      let i = $('<button>' + t.name + '</button>');
      i.addClass('btn', 'btn-primary'),
        i.attr('data-toggle', 'modal'),
        i.attr('data-target', '#pokemon-modal'),
        o.append(i),
        e.append(o),
        i.on('click', function (e) {
          n(t);
        });
    },
    loadList: function () {
      return fetch(e)
        .then(function (t) {
          return t.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            let n = { name: e.name, detailsUrl: e.url };
            !(function (e) {
              'object' == typeof e && 'name' in e && 'detailsUrl' in e
                ? t.push(e)
                : console.log('Pokemon is not correct');
            })(n),
              console.log(n);
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: o,
    showDetails: n,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
