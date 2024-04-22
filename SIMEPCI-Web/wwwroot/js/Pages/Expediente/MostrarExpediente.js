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
        url: 'https://simepciapii.azurewebsites.net/api/Expediente/ExpedienteCompletoPaciente?correoPaciente=' + encodeURIComponent(correo),
        method: 'GET',
        dataType: 'json',
    }).done(function (data) {
        mostrarDetallesExpediente(data);
    }).fail(function (xhr, status, error) {
        console.error('Error al obtener datos del API:', error);
    });
}

function mostrarDetallesExpediente(expediente) {
    $('#notasEnfermeria').text(expediente.notasEnfermeria || 'No hay notas de enfermería');
    $('#notasMedicas').text(expediente.notasMedicas || 'No hay notas médicas');
    $('#historialMedico').text(expediente.historialMedico || 'No hay historial médico');
}



