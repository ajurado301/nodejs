// Importamos fs/promises para al final borrar el fichero
const fs = require('fs/promises');

// Importamos leerPersona y writeAndReadObject
const lp = require('./leerPersona');
const wr = require('./writeAndReadObject');

let fichero = './persona.json';

lp.leerPersona()
.then((persona) => {
    return wr.writeAndReadObject(fichero, persona);
})
.then((persona) => {
    console.log('\nNombre   :', persona.name);
    console.log('Apellido :', persona.surname);
    console.log('Edad     :', persona.age);
    return fs.unlink(fichero);
})
.then(() => {
    console.log('\nFichero borrado...');
})
.catch((error) => {
    console.log(error);
})
