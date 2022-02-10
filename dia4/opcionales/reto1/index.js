// importar  express y clase Movie
const claseMovie = require('./clases/movie');
const express = require('express');

// Crear servidor express
const app = express();

// Variables
let puerto = 3000;
let pelicula = null;

// Middleware para capturar body json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Respuesta a cualquier petición en '/'
app.all('/', (req, res) => {
    let respuesta = { ok: true, message: 'Punto de inicio /' }
    res.status(200).send(respuesta);
})

// Gestión del endpoint '/pelicula'
// GET
app.get('/pelicula', (req, res) => {
    let respuesta;
    if (!pelicula) {
        respuesta = { ok: false, message: 'Película no encontrada, use POST para agregar una' };
    } else {
        respuesta = { ok: true, message: 'Pelíclula encontrada', pelicula: pelicula };
    };
    res.status(200).send(respuesta);
})

// POST
app.post('/pelicula', (req, res) => {
    let respuesta;
    if (!pelicula) {
        pelicula = bodyToPelicula(req.body);
        respuesta = { ok: true, message: 'Película agregada', pelicula: pelicula };
    } else {
        respuesta = { ok: false, message: 'Ya existe una película, use PUT para modificarla o DELETE para borrarla' };
    };
    res.status(200).send(respuesta);    
})

// PUT
app.put('/pelicula', (req, res) => {
    let respuesta;
    if(!pelicula) {
        respuesta = { ok: false, message: 'Película no encontrada, use POST para agregar una' };
    } else { 
        pelicula = bodyToPelicula(req.body);
        respuesta = { ok: true, message: 'Película actualizada', pelicula: pelicula };
    };
    res.status(200).send(respuesta);
})

// DELETE
app.delete('/pelicula', (req, res) => {
    let respuesta;
    if(!pelicula) {
        respuesta = { ok: false, message: 'Película no encontrada, use POST para agregar una' };
    } else { 
        pelicula = null;
        respuesta = { ok: true, message: 'Película eliminada' };
    };
    res.status(200).send(respuesta);
})

// Respuesta a cualquier endponit erroneo
app.use((req, res) => {
    respuesta = {ok: false, codigo: 404, mensaje: 'URL no encontrada'};
    res.status(404).send(respuesta);
})

// Poner servidor en marcha
app.listen(puerto, () => {
    console.log(`\nServidor corriendo en el puerto ${puerto}`)
})

function bodyToPelicula(json) {
    let result = new claseMovie.Movie();

    result.title = json.title;
    result.releaseYear = json.releaseYear;
    result.nationality = json.nationality;
    result.language = json.language;
    result.platform = json.platform;
    result.isMCU = json.isMCU;
    result.mainCharacterName = json.mainCharacterName;
    result.distributor = json.distributor;
    result.genre = json.genre;

    return result;
}