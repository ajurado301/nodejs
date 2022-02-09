// Importar express
const express = require('express');

const app = express();

let puerto = 3000;

// Para recibir json en el body
app.use(express.json());

// Responder petición GET en base a su query
app.get('/', (req, res) => {
    let name = req.query.name;
    let status = (name) ? 200 : 400; // si vienen atributo name en el query ok y si no error
    let respuesta = (name) ? { ok: true, message: 'Petición aceptada', name: name }
                           : { ok: false, message: 'Petición incorrecta' };    
    res.status(status).json(respuesta);
});

// Responder petición POST en base a su body
app.post('/', (req, res) => {
    let respuesta = { ok: false, message: 'Petición incorrecta' };
    let status = 400;

    let { name, surname, age } = req.body;
    let jsonIncompleto = (!name || !surname || !age);
    status = (jsonIncompleto) ? 400 : 200;
    respuesta = (jsonIncompleto) ? { ok: false, message: 'Petición incorrecta' }
                                 : { ok: true, message: 'Petición aceptada', name, surname, age };
    
    res.status(status).json(respuesta);
});

// Servidor express a la escucha
app.listen(puerto, () => {
    console.log(`\nServidor corriendo en el puerto ${puerto}\n`);
});

// Función para controlar la excepción al intentar convertir a json
// function jsonStringValido(jsonString) {
//     try {
//         console.log(JSON.parse(jsonString));
//     } catch (e) {
//         return false;
//     }
//     return true;
// }