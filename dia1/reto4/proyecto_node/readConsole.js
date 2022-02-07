// Importamos readline y creamos un interface
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

// Función readConsole
function readConsole(callback) {
    let persona = {};
    rl.question('\nDame tu nombre: ', (name) => {
        persona.name = name;
        rl.question('Dame tu apellido: ', (surname) => {
            persona.surname = surname;
            rl.question('Dame tu edad: ', (age) => {
                persona.age = parseInt(age);
                callback(persona);
                rl.close();
            });
        });
    });
}

exports.readConsole = readConsole;
