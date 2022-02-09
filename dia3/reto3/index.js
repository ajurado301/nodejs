// Importar express
const express = require('express');

const app = express();

let puerto = 3000;

// Escuchamos todos los verbos y rutas
app.all("*", (req, res) => {
    let respuesta;
    let status = 200;
    
    console.log('\nPetición recibida del cliente');
    console.log('Petición:');
    console.log(' - url       : ', req.url);
    console.log(' - método    : ', req.method);
    console.log(' - user-agent: ', req.headers['user-agent']);

    if (req.url == '/') {
        respuesta = { ok: true, message: 'Recibido!' };
    } else if (req.url == '/bye') {
        respuesta = { ok: true, message: 'Adios!' };     
    } else {
        status = 404;
        respuesta = { ok: false, message: 'Ruta no encontrada...' }; 
    };
    res.status(status).json(respuesta);
});

app.listen(puerto, () => {
    console.log(`\nServidor express corriendo en el puerto ${puerto}`);
});
