// importar  express y clase Professional
const claseProfessional = require('./clases/professional');
const express = require('express');

// Crear servidor express
const app = express();

// Variables
let puerto = 3000;
let profesional = null;

// Middleware para capturar body json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Respuesta a cualquier petición en '/'
app.all('/', (req, res) => {
    let respuesta = { ok: true, message: 'Punto de inicio /' }
    res.status(200).send(respuesta);
})

// Gestión del endpoint '/profesional'
// GET
app.get('/profesional', (req, res) => {
    let respuesta;
    if (!profesional) {
        respuesta = { ok: false, message: 'Profesional no encontrado, use POST para agregar uno' };
    } else {
        respuesta = { ok: true, message: 'Profesional encontrado', profesional: profesional };
    };
    res.status(200).send(respuesta);
})

// POST
app.post('/profesional', (req, res) => {
    let respuesta;
    if (!profesional) {
        profesional = bodyToProfesional(req.body);
        respuesta = { ok: true, message: 'Profesional agregado', profesional: profesional };
    } else {
        respuesta = { ok: false, message: 'Ya existe un profesional, use PUT para modificarlo o DELETE para borrarlo' };
    };
    res.status(200).send(respuesta);    
})

// PUT
app.put('/profesional', (req, res) => {
    let respuesta;
    if(!profesional) {
        respuesta = { ok: false, message: 'Profesional no encontrado, use POST para agregar uno' };
    } else { 
        profesional = bodyToProfesional(req.body);
        respuesta = { ok: true, message: 'Profesional actualizado', profesional: profesional };
    };
    res.status(200).send(respuesta);
})

// DELETE
app.delete('/profesional', (req, res) => {
    let respuesta;
    if(!profesional) {
        respuesta = { ok: false, message: 'Profesional no encontrado, use POST para agregar uno' };
    } else { 
        profesional = null;
        respuesta = { ok: true, message: 'Profesional eliminado' };
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

function bodyToProfesional(json) {
    let result = new claseProfessional.Professional();

    result.name = json.name;
    result.age = json.age;
    result.genre = json.genre;
    result.weight = json.weight;
    result.height = json.height;
    result.hairColor = json.hairColor;
    result.eyeColor = json.eyeColor;
    result.race = json.race;
    result.isRetired = json.isRetired;
    result.isRetired = json.isRetired;
    result.nationality = json.nationality;
    result.oscarsNumber = json.oscarsNumber;
    result.profession = json.profession;

    return result;
}