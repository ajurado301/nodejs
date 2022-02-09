// Importar http
const http = require('http');

let puerto = 3000;

// Crear servidor hhtp
const servidor = http.createServer((req, res) => {
    let respuesta;
    let status = 200;

    console.log('\nPetición recibida del cliente');
    console.log(`Solicitud a la url: ${req.url} mediante el método ${req.method}`);
    console.log('Cabecera de la solicitud:');
    console.log(' - content-type  : ', req.headers['content-type']);
    console.log(' - content-lenght: ', req.headers['content-length']);
    console.log(' - user-agent    : ', req.headers['user-agent']);

    if (req.url == '/') {
        respuesta = { ok: true, message: 'Recibido!' };
    } else if (req.url == '/bye') {
        respuesta = { ok: true, message: 'Adios!' };
    } else {
        status = 404;
        respuesta = { ok: false, message: 'Ruta no encontrada...' };
    };
    
    res.writeHead(status, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(respuesta));  
    
    res.end();
});

servidor.listen(puerto, () => {
    console.log(`\nServidor hhtp node corriendo en el puerto ${puerto}`);
});
