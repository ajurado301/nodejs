// Importamos fs
const fs = require('fs')

function writeAndReadObject(fichero, objeto, callback) {
    fs.writeFile(fichero, JSON.stringify(objeto), () => {
        fs.readFile(fichero, 'utf-8', (err, datos) => {
            callback(JSON.parse(datos));
        });
    })
}

exports.writeAndReadObject = writeAndReadObject;
