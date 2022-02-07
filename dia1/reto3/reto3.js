// Importamos readline y fs
const fs = require("fs");
const readline = require("readline");

// Creamos interface de readline
const rl = readline.createInterface(process.stdin, process.stdout);

let persona = {};

rl.question('\nDame tu nombre: ', (name) => {
    persona.name = name;
    rl.question('Dame tu apellido: ', (surname) => {
        persona.surname = surname;
        rl.question('Dame tu edad: ', (age) => {
            persona.age = parseInt(age);
            fs.writeFile('./persona.json', JSON.stringify(persona), () => {
                fs.readFile('./persona.json', 'utf-8', (err, datos) => {
                    persona = JSON.parse(datos);
                    console.log('\nNombre   :', persona.name);
                    console.log('Apellido :', persona.surname);
                    console.log('Edad     :', persona.age);
                });
            });
            rl.close();
        });
    });
})

