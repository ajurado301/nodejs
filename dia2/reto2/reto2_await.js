// Importamos fs/promises
const fs = require('fs/promises');

let fichero = './persona.json';
let persona = { name: 'Ander', surname: 'Jurado', age: 54 };

reto2();

async function reto2() {
    try {
        await fs.writeFile(fichero, JSON.stringify(persona));

        let jsonPersona = JSON.parse(await fs.readFile(fichero, 'utf-8'));
        console.log('\nNombre   :', jsonPersona.name);
        console.log('Apellido :', jsonPersona.surname);
        console.log('Edad     :', jsonPersona.age);

        await fs.unlink(fichero);
        console.log('\nFichero borrado...');

    } catch (error) {
        console.log(error)
    }
}
