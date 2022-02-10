// importar  express y clase Professional
const claseProfessional = require('./clases/professional');
const express = require('express');

// Crear servidor express
const app = express();

// Variables
let puerto = 3000;
let profesionales = [];

// Middleware para capturar body json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Respuesta a cualquier petición en '/'
app.all('/', (req, res) => {
    let respuesta = { ok: true, message: 'Punto de inicio /' }
    res.status(200).send(respuesta);
})


// Gestión del endpoint '/profesionales'
// GET (todos o por query id)
app.get('/profesionales', (req, res) => {
    let respuesta;
    let id = req.query.id;

    if (!id) {
        respuesta ={ ok: true, message: 'Lista de profesionales:', profesionales: profesionales };
    } else {
        id = parseInt(id); 
        if (id < profesionales.length) {
            respuesta = { ok: true, message: `Profesional con id ${id}:`, profesional: profesionales[id] }
        }else {
            respuesta = { ok: false, message: `Profesional con id ${id} no encontrado` }
        }
    };
    res.status(200).send(respuesta);
})

// POST
app.post('/profesionales', (req, res) => {
    let respuesta = { ok: true, message: 'Profesional agregado' };
    profesionales.push(bodyToProfesional(req.body));
    res.status(200).send(respuesta);      
})

// PUT
app.put('/profesionales', (req, res) => {
    let respuesta;
    let id = req.body.id;

    if (id < profesionales.length) {
        profesionales[id] = bodyToProfesional(req.body);
        respuesta = { ok: true, message: `Profesional con id ${id} actualizado` }
    }else {
        respuesta = { ok: false, message: `Profesional con id ${id} no encontrado` }
    };
    res.status(200).send(respuesta);
})

// DELETE
app.delete('/profesionales', (req, res) => {
    let respuesta;
    let id = req.body.id;

    if (id < profesionales.length) {
        profesionales.splice(id, 1);
        respuesta = { ok: true, message: `Profesional con id ${id} eliminado` }
    }else {
        respuesta = { ok: false, message: `Profesional con id ${id} no encontrado` }
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