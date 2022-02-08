// Importamos fs/promises
const fs = require('fs/promises');

let fichero = './persona.json';
let persona = { name: 'Ander', surname: 'Jurado', age: 54 };

fs.writeFile(fichero, JSON.stringify(persona))
.then(() => {
    return fs.readFile(fichero, 'utf-8');
})
.then((datos) => {
    let jsonPersona = JSON.parse(datos);
    console.log('\nNombre   :', jsonPersona.name);
    console.log('Apellido :', jsonPersona.surname);
    console.log('Edad     :', parseInt(jsonPersona.age));
    return fs.unlink(fichero);
})
.then(() => {
    console.log('\nFichero borrado...');
})
.catch((error) => {
    console.log(error);
});    
