// Importamos readConsole y writeAndReadObject
const rc = require('./readConsole');
const wr = require('./writeAndReadObject');

rc.readConsole((persona) => {
    wr.writeAndReadObject('./persona.json', persona, (persona) => {
        console.log('\nNombre   :', persona.name);
        console.log('Apellido :', persona.surname);
        console.log('Edad     :', persona.age);
    });
});
