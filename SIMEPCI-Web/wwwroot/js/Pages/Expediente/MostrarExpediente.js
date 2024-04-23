$(document).ready(function () {
    $('#examenForm').submit(function (event) {
        event.preventDefault();
        var correo = $('#correoPaciente').val();
        obtenerExpedienteCompleto(correo);
    });

    $('#buscarExpedienteBtn').click(function () {
        var correo = $('#correoPaciente').val();
        obtenerExpedienteCompleto(correo);
    });
});

function obtenerExpedienteCompleto(correo) {
    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/Expediente/ExpedienteCompletoPaciente',
        method: 'GET',
        data: { correoPaciente: correo },
        headers: {
            'Cache-Control': 'no-cache'
        },
        dataType: 'json'
    }).done(function (data) {
        mostrarDetallesExpediente(data);
    }).fail(function (xhr, status, error) {
        console.error('Error al obtener datos del API:', error);
    });
}

function mostrarDetallesExpediente(expediente) {
    if (expediente && expediente.infoExpediente) {
        $('#notasEnfermeria').text(expediente.infoExpediente.notasEnfermeria || 'No hay notas de enfermería');
        $('#notasMedicas').text(expediente.infoExpediente.notasMedicas || 'No hay notas médicas');
        $('#historialMedico').text(expediente.infoExpediente.historialMedico || 'No hay historial médico');
    } else {
        console.error('La respuesta del API no contiene la información esperada.');
    }
}




