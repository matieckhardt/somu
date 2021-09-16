function enviarMensaje() {
    var nombre = document.getElementById("nombreFormulario").value;
    var email = document.getElementById("emailFormulario").value;
    var asunto = document.getElementById("asuntoFormulario").value;
    var mensaje = document.getElementById("mensajeFormulario").value;

    if (nombre != "" && email != "" && asunto != "" && mensaje != "") {
        guardarMensaje(nombre, email, asunto, mensaje);
    }
}

function guardarMensaje(nombre, email, asunto, mensaje) {
    var urlCompleta = 'https://forexportmotos.com/OperacionFormularios/EnviarConsulta';

    var request = $.ajax({
        url: urlCompleta,
        type: 'GET',
        dataType: 'json',
        data: {
            nombre: nombre,
            email: email,
            asunto: asunto,
            mensaje: mensaje
        }
    })
    request.done(function (response) {
        document.getElementById("form-contacto").reset();
        $('#modalExito').modal('show');
    })
    request.fail(function (jqXHR, textStatus) {
        document.getElementById("form-contacto").reset();
        $('#modalFail').modal('show');
    })
}