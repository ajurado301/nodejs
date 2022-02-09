// importar  express
const express = require('express');

// Crear servidor express
const app = express();

// Variables
let puerto = 3000;
let profesionales = [];

// Middleware para capturar body json
app.use(express.json());

// Respuesta a cualquier petición en '/'
app.all('/', (req, res) => {
    res.status(200).json({ ok: true, message: 'endpoint /' });
})

// Gestión del endpoint '/profesionales'
// GET (todos o por query id)
app.get('/profesionales', (req, res) => {
    let id = req.query.id;

    if (profesionales.length === 0) { 
        res.status(200).json({ ok: true, message: 'Lista de profesionales vacía:' });
    } else if (!id) {
            res.status(200).json({ ok: true, message: 'Lista de profesionales:', profesionales: profesionales });
    }else {
        let profesional = profesionales.filter((profesional) => { return profesional.id === parseInt(id) })[0] || null;
        if (!profesional) {
            res.status(200).json({ ok: true, message: `Profesional con id: ${id} no encontrado` });
        } else {
            res.status(200).json({ ok: true, message: `Profesional con id: ${id}:`, profesional: profesional });
        }
    }
})

// POST (Agregamos con un id igual al del último profesional + 1)
app.post('/profesionales', (req, res) => {
    let id = (profesionales.length > 0) ? profesionales[profesionales.length - 1].id + 1 : 1;
    let profesional = {};
    profesional.id = id;
    for(atributo in req.body) {
        profesional[atributo] = req.body[atributo]
    };
    profesionales.push(profesional);
    res.status(200).json({ ok: true, message: 'Profesional agregado', profesional: profesional });    
})

// PUT (por query id)
app.put('/profesionales', (req, res) => {
    let id = req.query.id;

    if (profesionales.length === 0) { 
        res.status(200).json({ ok: true, message: 'Lista de profesionales vacía:' });
    }else if(!id) {
        res.status(200).json({ ok: true, message: 'Se necesita el id vía query' });
    }else {
        let i = 0;
        let encontrado = false;
        while (i < profesionales.length && !encontrado) {
            if (profesionales[i].id === parseInt(id)) {
                encontrado = true;
            }else {
                i++;
            }
        };
        if (!encontrado) {
            res.status(200).json({ ok: true, message: `Profesional con id: ${id} no encontrado` });
        } else {
            for(atributo in req.body) {
                profesionales[i][atributo] = req.body[atributo]
            };
            res.status(200).json({ ok: true, message: `Profesional con id: ${id} actualizado:`, profesional: profesionales[i] });
        }
    }    
})

// DELETE (por query id)
app.delete('/profesionales', (req, res) => {
    let id = req.query.id;

    if (profesionales.length === 0) { 
        res.status(200).json({ ok: true, message: 'Lista de profesionales vacía:' });
    }else if(!id) {
        res.status(200).json({ ok: true, message: 'Se necesita el id vía query' });
    }else {
        let i = 0;
        let encontrado = false;
        while (i < profesionales.length && !encontrado) {
            if (profesionales[i].id === parseInt(id)) {
                encontrado = true;
            }else {
                i++;
            }
        };
        if (!encontrado) {
            res.status(200).json({ ok: true, message: `Profesional con id: ${id} no encontrado` });
        } else {
            profesionales.splice(i, 1);
            res.status(200).json({ ok: true, message: `Profesional con id: ${id} eliminado:` });
        }
    }       
})

// Poner servidor en marcha
app.listen(puerto, () => {
    console.log(`\nServidor corriendo en el puerto ${puerto}`)
})
