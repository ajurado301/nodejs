// Importamos readline y fs/promises
const fs = require("fs/promises");
const readline = require("readline");

let fichero = './persona.json';
let persona = { name: null, surname: null, age: null };

pedirDato('\nDame tu nombre: ')
.then((respuesta) => {
    persona.name = respuesta;
    return pedirDato('Dame tu apellido: ');
})
.then((respuesta) => {
    persona.surname = respuesta;
    return pedirDato('Dame tu edad: ');
})
.then((respuesta) => {
    persona.age = respuesta;
    return fs.writeFile(fichero, JSON.stringify(persona));
})
.then(() => {
    return fs.readFile(fichero, 'utf-8');
})
.then((datos) => {
    persona = JSON.parse(datos);
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

function pedirDato(pregunta) {
    const promesa = new Promise((resolve, reject) => {
        const rl = readline.createInterface(process.stdin, process.stdout);
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta);
            rl.close();
        });
    });
    return promesa;
}