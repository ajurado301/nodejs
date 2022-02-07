// Importamos fs
const fs = require("fs");

let persona = { name: 'Ander', surname: 'Jurado', age: 54 };

fs.writeFile('./persona.json', JSON.stringify(persona), () => {
    fs.readFile('./persona.json', 'utf-8', (err, datos) => {
        persona = JSON.parse(datos);
        console.log('Nombre   :', persona.name);
        console.log('Apellido :', persona.surname);
        console.log('Edad     :', persona.age);
    });
})