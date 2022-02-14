// Variables
let pokemons;
let delayKeyup;
let urlApiPokemon = 'https://pokeapi.co/api/v2';
let headers = { 'content-type': 'application/json; charset=UTF-8' };
let parametros = {
    headers: headers,
    method: "GET"
};

jQuery(() => {

    guardarTodos();

    $('#buscarNombre').keyup(() => {
        filtrarNombres();
    })
})

// Guardar todos los Pokemons (nombres y urls)
function guardarTodos() {
    let url = urlApiPokemon + '/pokemon/?limit=5000';
    fetch(url, parametros)
    .then((respuesta) => {
        return respuesta.json();
    })
    .then((respuestaJson) => {
        pokemons = respuestaJson.results;
    })
    .catch((error) => {
        console.log(error);
    });
}

// Filtrar nombres de Pokemons con límite de 15
function filtrarNombres() {
    if (delayKeyup) {
        clearTimeout(delayKeyup);
    };
    delayKeyup = setTimeout(() => {
        let listaPokemon = $('#listaPokemon');
        let buscarNombre = $('#buscarNombre');
        listaPokemon.html('');
        if (buscarNombre.val().length > 0 ){
            let filtro = pokemons.filter((pokemon) =>{
                return pokemon.name.toLowerCase().startsWith(buscarNombre.val().toLowerCase());
            });
            let limite = (filtro.length < 15) ? filtro.length : 15;
            for (let i = 0; i < limite; i++) {
                let nombreHTML = `<li onclick="obtenerPokemon('${filtro[i].url}')" class="list-group-item">${filtro[i].name}</li>`
                listaPokemon.append(nombreHTML);
            }
        }
    }, 300)
}

// Obetner Pokemon (llamado desde el click del li html creado en filtrarNombres)
function obtenerPokemon(urlPokemon) {
    $('#busquedaForm').trigger('reset');
    $('#listaPokemon').html('');

    fetch(urlPokemon, parametros)
    .then((pokemon) => {
        return pokemon.json();
    })
    .then((pokemonJson) => {
        let datosCard = {
            nombre: pokemonJson.name,
            habilidades: pokemonJson.abilities.map((habilidad) => { return habilidad.ability.name }),
            urlImagen: pokemonJson.sprites.other['official-artwork'].front_default
        };
        mostrarCard(datosCard);
    })
    .catch((error) => {
        console.log(error)
    })
}

// Mostrar Card Pokemon 
function mostrarCard(datosCard) {
    let divCard = $('#divCard');
    divCard.html('');
    let cardHTML = '<div class="card mt-5" style="width: 18rem;">';
    cardHTML += `<img src="${datosCard.urlImagen}" class="card-img-top" alt="Imagen ${datosCard.nombre}">`;
    cardHTML += '<div class="card-body d-flex flex-column">';
    cardHTML += `<p class="card-title h4 w-auto bg-dark text-light text-center p-2">${datosCard.nombre.toUpperCase()}</p>`;
    cardHTML += '<p class="card-text my-0 text-center"><b>Habilidades</b></p>';
    datosCard.habilidades.forEach((habilidad) => {
        cardHTML += `<p class="card-text my-0">- ${habilidad}</p>`;
    });
    cardHTML += "</div></div>";
    divCard.append(cardHTML);
}
