// Variables
let urlBase = 'http://localhost:3000/profesionales';
let headers = { 'content-type': 'application/json; charset=UTF-8' };
let toast;

// DOM cargado
jQuery(() => {

    cargarProfesionales();

    $("#mostrar").on('click', () => {
        mostrar();
    });
    $("#crear").on('click', () => {
        crear();
    });
    $("#modificar").on('click', () => {
        modificar();
    });
    $("#eliminar").on('click', () => {
        eliminar();
    });
    $('#reiniciar').on('click', () => {
        restablecerForm();
    })
})

// Mostrar profesional
async function mostrar() {
    let id = (isNaN(parseInt($('#idSelect').val()))) ? '' : $('#idSelect').val();
    let url = urlBase;

    if (id.length > 0) {
        url += `?id=${id}`
    }

    let parametros = {
        headers: headers,
        method: "GET"
    };

    try {
        let respuesta = await fetch(url, parametros);
        let respuestaJson = await respuesta.json();
        let titulo = (respuestaJson.ok) ? 'Correcto' : 'Alerta';
        mostrarToast(titulo, respuestaJson.message);
        if (respuestaJson.ok && id.length > 0) {
            mostrarFormulario(respuestaJson.profesional);
        } else {
            mostrarListado(respuestaJson.profesionales);
        }
    } catch (error) {
        mostrarToast('Error', respuestaJson.message)
    }
}

// Crear profesional
async function crear() {
    let profesional = leerFormulario();

    let cuerpo = validarFormulario(profesional);
    if (cuerpo == '') {
        let parametros = {
            headers: headers,
            body: JSON.stringify(profesional),
            method: "POST"
        };

        try {
            let respuesta = await fetch(urlBase, parametros);
            let respuestaJson = await respuesta.json();
            mostrarToast('Correcto', respuestaJson.message);
            cargarProfesionales();
        } catch (error) {
            mostrarToast('Error', respuestaJson.message)
        }

        $('#profesionalForm').trigger("reset");
        if ($('#tablaResultados').html() != '') {
            mostrar();
        }
    }else {
        mostrarToast('Alerta', cuerpo);
    }
}

// Modificar profesional
async function modificar() {
    let id = (isNaN(parseInt($('#idSelect').val()))) ? '' : $('#idSelect').val();
    if (id.length == 0) {
        let titulo = 'Alerta'
        let cuerpo = 'Se necesita el id del profesional';
        mostrarToast(titulo, cuerpo);
    }else {
        let profesional = leerFormulario();

        let cuerpo = validarFormulario(profesional);
        if (cuerpo == '') {
            profesional.id = id;
            let parametros = {
                headers: headers,
                body: JSON.stringify(profesional),
                method: "PUT"
            };

            try {
                let respuesta = await fetch(urlBase, parametros);
                let respuestaJson = await respuesta.json();
                let titulo = (respuestaJson.ok == true) ? 'Correcto' : 'Alerta';
                mostrarToast(titulo, respuestaJson.message)
            } catch (error) {
                mostrarToast('Error', respuestaJson.message)
            }

            $('#profesionalForm').trigger("reset");
            if ($('#tablaResultados').html() != '') {
                mostrar();
            }
        }else {
            mostrarToast('Alerta', cuerpo);
        }
    }
}

// Eliminar profesional
async function eliminar() {
    let id = (isNaN(parseInt($('#idSelect').val()))) ? '' : $('#idSelect').val();
    if (id.length == 0) {
        let titulo = 'Alerta'
        let cuerpo = 'Se necesita el id del profesional';
        mostrarToast(titulo, cuerpo);
    }else {
        let parametros = {
            headers: headers,
            body: JSON.stringify({ id: id }),
            method: "DELETE"
        };

        try {
            let respuesta = await fetch(urlBase, parametros);
            let respuestaJson = await respuesta.json();
            let titulo = (respuestaJson.ok == true) ? 'Correcto' : 'Alerta';
            mostrarToast(titulo, respuestaJson.message)
            if (respuestaJson.ok) {
                cargarProfesionales();
            }
        } catch (error) {
            mostrarToast('Error', respuestaJson.message)
        }
    };
    $('#profesionalForm').trigger("reset");
    if ($('#tablaResultados').html() != '') {
        mostrar();
    }
}

// Leer formulario
function leerFormulario() {
    let result = {
        "name": $('#nombre').val(),
        "age": (isNaN(parseInt($('#edad').val()))) ? '' : parseInt($('#edad').val()),
        "genre": $('input[name=genero]:checked', '#profesionalForm').val(),
        "weight": (isNaN(parseInt($('#peso').val()))) ? '' : parseInt($('#peso').val()),
        "height": (isNaN(parseInt($('#altura').val()))) ? '' : parseInt($('#altura').val()),
        "hairColor": $('#colorPelo').val(),
        "eyeColor": $('#colorOjos').val(),
        "race": ($('#raza').val() == '*Raza') ? '' :  $('#raza').val(),
        "isRetired": $('#retirado').prop('checked'),
        "nationality": $('#nacionalidad').val(),
        "oscarsNumber": (isNaN(parseInt($('#nOscars').val()))) ? '' : parseInt($('#nOscars').val()),
        "profession": ($('#profesion').val() == '*Profesión') ? '' :  $('#profesion').val()
    }
    return result;
}

// Mostrar profesional en formulario
function mostrarFormulario(profesional){
    let { name, age, genre, weight, height, hairColor, eyeColor, race, isRetired, nationality, oscarsNumber, profession } = profesional;
    $('#nombre').val(name);
    $('#edad').val(age);
    $('#' + genre.toLowerCase()).prop('checked', true);
    $('#peso').val(weight);
    $('#altura').val(height);
    $('#colorPelo').val(hairColor);
    $('#colorOjos').val(eyeColor);
    $('#raza').val(race);
    $('#retirado').prop('checked', isRetired);
    $('#nacionalidad').val(nationality);
    $('#nOscars').val(oscarsNumber);
    $('#profesion').val(profession);
}

// Validar formulario
function validarFormulario(profesional) {
    let result = '';
    let { name, age, nationality, genre, race, profession } = profesional;

    result += (name == '') ? 'Nombre' : '';
    result += (age == '' && result != '') ? ' / Edad' : (age == '') ? 'Edad' : '';
    result += (nationality == '' && result != '') ? ' / Nacionalidad' : (nationality == '') ? 'Nacionalidad' : '';
    result += (race == '' && result != '') ? ' / Raza' : (race == '') ? 'Raza' : '';
    result += (profession == '' && result != '') ? ' / Profesión' : (profession == '') ? 'Profesión' : '';
    
    if (result != '') {
        result = 'Los siguientes campos son obligatorios: ' + result;
    }
    return result;
}

// Mostrar Listado de profesionales en la tabla
function mostrarListado(profesionales) {
    let resultados = $('#tablaResultados');
    resultados.html('');
    profesionales.forEach((profesional, indice) => {
        let { name, age, genre, weight, height, hairColor, eyeColor, race, isRetired, nationality, oscarsNumber, profession } = profesional;
        let tabla = '<table class="table table-success table-striped mb-2">';
        tabla += `<thead><tr><th scope="col" colspan=4>Profesional id: ${indice} - ${name}</th></tr></thead>`;
        tabla += `<tbody><tr><td><b>Edad:</b> ${age}</td><td><b>Peso:</b> ${weight}</td>`;
        tabla += `<td><b>Altura:</b> ${height}</td><td><b>Oscars:</b> ${oscarsNumber}</td></tr>`;
        tabla += `<tr><td colspan="2"><b>Color de pelo:</b> ${hairColor}</td><td colspan="2"><b>Color de ojos:</b> ${eyeColor}</td></tr>`;
        tabla += `<tr><td colspan="2"><b>Nacionalidad:</b> ${nationality}</td><td colspan="2"><b>Raza:</b> ${race}</td></tr>`;
        tabla += `<tr><td colspan="2"><b>Género:</b> ${genre}</td><td colspan="2"><b>Profesión:</b> ${profession}</td></tr></tbody></table>`;
        resultados.append(tabla);
    })
}

// Cargar ids de los profesionales en idSelect para usar con POST, PUT y DELETE
async function cargarProfesionales() {
    let parametros = {
        headers: headers,
        method: "GET"
    };
    try {
        let respuesta = await fetch(urlBase, parametros);
        let respuestaJson = await respuesta.json();
        let ids = $('#idSelect');
        ids.html('<option selected>id profesional</option>');
        if (respuestaJson.ok) {
            respuestaJson.profesionales.forEach((profesional, indice) => {
                ids.append(`<option value="${indice}">${indice} - ${profesional.name}</option>`)
            })
        }
    } catch (error) {
        mostrarToast('Error', respuestaJson.message)
    }
}

// Restablecer formulario y tabla de resultados
function restablecerForm() {
    $('#profesionalForm').trigger("reset");
    $('#tablaResultados').html('');
    mostrarToast('Correcto', 'Formulario restablecido');
}

// Mostrar Toast
function mostrarToast(titulo, cuerpo) {
    let imagen = (titulo == 'Alerta') ? './img/alerta.png' : (titulo == 'Error') ? './img/error.png' : './img/ok.png';
    $('#imagenToast').attr('src', imagen);
    $('#alertaToastTitulo').html(titulo);
    $('#alertaToastCuerpo').html(cuerpo);
    if (toast) {
        toast.dispose();
    }
    toast = new bootstrap.Toast(alertaToast);
    toast.show();
}