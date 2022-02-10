// importar  express, clase Professional y clase Movie
const claseProfessional = require('./clases/professional');
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

//**********************************************************************************************
// Gestión del endpoint '/pelicula'
//**********************************************************************************************
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
//**********************************************************************************************
// Fin gestión del endpoint '/pelicula'
//**********************************************************************************************

//**********************************************************************************************
// Gestión del endpoint '/pelicula/actor'
//**********************************************************************************************
// GET
app.get('/pelicula/actor', (req, res) => {
    let respuesta;
    let id = req.query.id;
    if (!pelicula) {
        respuesta = { ok: false, message: 'Es necesario disponer de una película' };
    }else if (pelicula.actors.length == 0){
        respuesta = { ok: false, message: 'No hay asignados actores en la película, use POST para agregar uno' };
    }else if (!id) {
        respuesta ={ ok: true, message: 'Lista de actores:', actores: pelicula.actors };
    } else {
        id = parseInt(id); 
        if (id < pelicula.actors.length) {
            respuesta = { ok: true, message: `Actor con id ${id}:`, actor: pelicula.actors[id] }
        }else {
            respuesta = { ok: false, message: `Actor con id ${id} no encontrado` }
        }
    };
    res.status(200).send(respuesta);
})

// POST
app.post('/pelicula/actor', (req, res) => {
    let respuesta;
    
    if (req.body.profession != 'Actor') {
        respuesta = { ok: false, message: 'Este profesional no es un actor' };
    }else if (!pelicula) {
        respuesta = { ok: false, message: 'Es necesario disponer de una película' };
    } else {
        pelicula.actors.push(bodyToProfesional(req.body));
        respuesta = { ok: true, message: 'Actor agregado' };
    };
    res.status(200).send(respuesta);
})

// PUT
app.put('/pelicula/actor', (req, res) => {
    let respuesta;
    let id = req.body.id;
    
    if (req.body.profession != 'Actor') {
        respuesta = { ok: false, message: 'Este profesional no es un actor' };
    }else if (!pelicula) {
        respuesta = { ok: false, message: 'Es necesario disponer de una película' };
    } else if (id < pelicula.actors.length) {
        pelicula.actors[id] = bodyToProfesional(req.body);
        respuesta = { ok: true, message: `Actor con id ${id} actualizado` };
    }else {
        respuesta = { ok: false, message: `Actor con id ${id} no encontrado` }
    };
    res.status(200).send(respuesta);
})

// DELETE
app.delete('/pelicula/actor', (req, res) => {
    let respuesta;
    let id = req.body.id;
    
    if (!pelicula) {
        respuesta = { ok: false, message: 'Es necesario disponer de una película' };
    }else if (id < pelicula.actors.length) {
        pelicula.actors.splice(id, 1);
        respuesta = { ok: true, message: `Actor con id ${id} eliminado` };
    }else {
        respuesta = { ok: false, message: `Actor con id ${id} no encontrado` }
    };
    res.status(200).send(respuesta);
})
//**********************************************************************************************
// Fin gestión del endpoint '/pelicula/actor'
//**********************************************************************************************

//**********************************************************************************************
// Gestión del endpoint '/pelicula/director'
//**********************************************************************************************
// GET
app.get('/pelicula/director', (req, res) => {
    let respuesta;
    if (!pelicula) {
        respuesta = { ok: false, message: 'Es necesario disponer de una película' };
    } else if (!pelicula.director) {
        respuesta = { ok: false, message: 'Director no encontrado, use POST para agregar uno' };
    }else {
        respuesta = { ok: true, message: 'Director encontrado:', director: pelicula.director };
    };
    res.status(200).send(respuesta);
})

// POST
app.post('/pelicula/director', (req, res) => {
    let respuesta;
    if (req.body.profession != 'Director') {
        respuesta = { ok: false, message: 'Este profesional no es un director' };
    }else if (!pelicula) {
        respuesta = { ok: false, message: 'Es necesario disponer de una película' };
    } else if (!pelicula.director) {
        pelicula.director = bodyToProfesional(req.body);
        respuesta = { ok: true, message: 'Director agregado' };
    }else {
        respuesta = { ok: false, message: 'Ya hay director, use PUT para modificarlo o DELETE para borrarlo' };
    };
    res.status(200).send(respuesta);
})

// PUT
app.put('/pelicula/director', (req, res) => {
    let respuesta;
    
    if (req.body.profession != 'Director') {
        respuesta = { ok: false, message: 'Este profesional no es un director' };
    }else if (!pelicula) {
        respuesta = { ok: false, message: 'Es necesario disponer de una película' };
    } else if (!pelicula.director) {
        respuesta = { ok: false, message: 'No hay director, use POST para agregar uno' };
    }else {
        pelicula.director = bodyToProfesional(req.body);
        respuesta = { ok: true, message: 'Director actualizado' };
    };
    res.status(200).send(respuesta);
})

// DELETE
app.delete('/pelicula/director', (req, res) => {
    let respuesta;
    
    if (!pelicula) {
        respuesta = { ok: false, message: 'Es necesario disponer de una película' };
    } else if (!pelicula.director) {
        respuesta = { ok: false, message: 'No hay director, use POST para agregar uno' };
    }else {
        pelicula.director = null;
        respuesta = { ok: true, message: 'Director eliminado' };
    };
    res.status(200).send(respuesta);
})
//**********************************************************************************************
// Fin gestión del endpoint '/pelicula/director'
//**********************************************************************************************

//**********************************************************************************************
// Gestión del endpoint '/pelicula/guionista'
//**********************************************************************************************
/// GET
app.get('/pelicula/guionista', (req, res) => {
    let respuesta;
    if (!pelicula) {
        respuesta = { ok: false, message: 'Es necesario disponer de una película' };
    } else if (!pelicula.writer) {
        respuesta = { ok: false, message: 'Guionista no encontrado, use POST para agregar uno' };
    }else {
        respuesta = { ok: true, message: 'Guionista encontrado:', guionista: pelicula.writer };
    };
    res.status(200).send(respuesta);
})

// POST
app.post('/pelicula/guionista', (req, res) => {
    let respuesta;
    if (req.body.profession != 'Guionista') {
        respuesta = { ok: false, message: 'Este profesional no es un guionista' };
    }else if (!pelicula) {
        respuesta = { ok: false, message: 'Es necesario disponer de una película' };
    } else if (!pelicula.writer) {
        pelicula.writer = bodyToProfesional(req.body);
        respuesta = { ok: true, message: 'Guionista agregado' };
    }else {
        respuesta = { ok: false, message: 'Ya hay guionista, use PUT para modificarlo o DELETE para borrarlo' };
    };
    res.status(200).send(respuesta);
})

// PUT
app.put('/pelicula/guionista', (req, res) => {
    let respuesta;
    
    if (req.body.profession != 'Guionista') {
        respuesta = { ok: false, message: 'Este profesional no es un guionista' };
    }else if (!pelicula) {
        respuesta = { ok: false, message: 'Es necesario disponer de una película' };
    } else if (!pelicula.writer) {
        respuesta = { ok: false, message: 'No hay guionista, use POST para agregar uno' };
    }else {
        pelicula.writer = bodyToProfesional(req.body);
        respuesta = { ok: true, message: 'Guionista actualizado' };
    };
    res.status(200).send(respuesta);
})

// DELETE
app.delete('/pelicula/guionista', (req, res) => {
    let respuesta;
    
    if (!pelicula) {
        respuesta = { ok: false, message: 'Es necesario disponer de una película' };
    } else if (!pelicula.writer) {
        respuesta = { ok: false, message: 'No hay guionista, use POST para agregar uno' };
    }else {
        pelicula.writer = null;
        respuesta = { ok: true, message: 'Guionista eliminado' };
    };
    res.status(200).send(respuesta);
})
//**********************************************************************************************
// Fin gestión del endpoint '/pelicula/guionista'
//**********************************************************************************************

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
    result.nationality = json.nationality;
    result.oscarsNumber = json.oscarsNumber;
    result.profession = json.profession;

    return result;
}

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
