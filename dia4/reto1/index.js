// importar  express
const express = require('express');

// Crear servidor express
const app = express();

// Variables
let puerto = 3000;
let profesional = null;

// Middleware para capturar body json
app.use(express.json());

// Respuesta a cualquier petición en '/'
app.all('/', (req, res) => {
    res.status(200).json({ ok: true, message: 'endpoint /' });
})

// Gestión del endpoint '/profesional'
// GET
app.get('/profesional', (req, res) => {
    if (!profesional) {
        res.status(200).json({ ok: true, message: 'Profesional no encontrado, use POST para agregar uno', profesional: profesional });
    } else {
        res.status(200).json({ ok: true, message: 'Profesional encontrado', profesional: profesional });
    }
})

// POST
app.post('/profesional', (req, res) => {
    if (!profesional) {
        profesional = req.body;
        res.status(200).json({ ok: true, message: 'Profesional agregado', profesional: profesional });
    } else {
        res.status(200).json({ ok: true, message: 'Ya existe un profesional, use PUT para modificarlo o DELETE para borrarlo', profesional: profesional });
    }
})

// PUT
app.put('/profesional', (req, res) => {
    if(!profesional) {
        res.status(200).json({ ok: true, message: 'Profesional no encontrado, use POST para agregar uno', profesional: profesional });
    } else { 
        profesional = req.body;
        res.status(200).json({ ok: true, message: 'Profesional actualizado', profesional: profesional });
    }
})

// DELETE
app.delete('/profesional', (req, res) => {
    if(!profesional) {
        res.status(200).json({ ok: true, message: 'Profesional no encontrado, use POST para agregar uno', profesional: profesional });
    } else { 
        profesional = null;
        res.status(200).json({ ok: true, message: 'Profesional eliminado', profesional: profesional });
    }
})

// Poner servidor en marcha
app.listen(puerto, () => {
    console.log(`\nServidor corriendo en el puerto ${puerto}`)
})
