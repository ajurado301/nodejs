// Importamos fs/promises para al final borrar el fichero
const fs = require('fs/promises');

// Importamos leerPersona y writeAndReadObject
const lp = require('./leerPersona');
const wr = require('./writeAndReadObject');

let fichero = './persona.json';

reto4();

async function reto4() {
    try {
        persona = await lp.leerPersona();
        
        persona = await wr.writeAndReadObject(fichero, persona);
        console.log('\nNombre   :', persona.name);
        console.log('Apellido :', persona.surname);
        console.log('Edad     :', persona.age);
        
        await fs.unlink(fichero);
        console.log('\nFichero borrado...');
    } catch (error) {
        console.log(error);
    }
}
