// Importamos readline
const readline = require("readline");

function leerPersona() {
    const promesa = new Promise((resolve, reject) => {
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
            resolve(persona);
        }) // Sin catch ya que solo invocamos promesas pedirDato y esta no implementa el reject
    });
    return promesa;
}

function pedirDato(pregunta) {
    const dato = new Promise((resolve) => {
        const rl = readline.createInterface(process.stdin, process.stdout);
        rl.question(pregunta, (respuesta) => { // el callback rl.question no devuelve error así que no implementamos reject
            resolve(respuesta);
            rl.close();
        });
    });
    return dato;
}

exports.leerPersona = leerPersona;
