// Importamos readline y fs/promises
const fs = require("fs/promises");
const readline = require("readline");

let fichero = './persona.json';

reto3();

async function reto3() {
    try {
        let persona = { name: null, surname: null, age: null }
        persona.name = await pedirDato('\nDame tu nombre: ');
        persona.surname = await pedirDato('Dame tu apellido: ');
        persona.age = await pedirDato('Dame tu edad: ');

        await fs.writeFile(fichero, JSON.stringify(persona));

        persona = JSON.parse(await fs.readFile(fichero, 'utf-8'));
        console.log('\nNombre   :', persona.name);
        console.log('Apellido :', persona.surname);
        console.log('Edad     :', persona.age);

        fs.unlink(fichero);
        console.log('\nFichero borrado...');

    } catch (error) {
        console.log(error)
    }
}

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