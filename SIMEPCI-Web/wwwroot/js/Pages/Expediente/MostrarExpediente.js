function MostrarExpediente() {
    var correoPaciente = '';

    this.InitView = function () {
        correoPaciente = obtenerCorreoPacienteDesdeURL();
        var view = new MostrarExpediente();
        view.ObtenerExpediente();
    };

    this.ObtenerExpediente = function () {
        var url_base = 'https://simepciapii.azurewebsites.net/api/Expediente/ExpedienteCompletoPaciente';

        $.ajax({
            method: 'GET',
            url: url_base + '?correoPaciente=' + correoPaciente,
            dataType: 'json'
        }).done(function (result) {
            $('#correoPaciente').text(result.infoExpediente.correoPaciente);
            $('#notasEnfermeria').text(result.infoExpediente.notasEnfermeria);
            $('#notasMedicas').text(result.infoExpediente.notasMedicas);
            $('#historialMedico').text(result.infoExpediente.historialMedico);

            var citasHtml = '';
            result.citas.forEach(function (cita) {
                citasHtml += '<p><strong>Fecha:</strong> ' + cita.fecha + '</p>';
                citasHtml += '<p><strong>Especialidad:</strong> ' + cita.especialidad + '</p>';
                citasHtml += '<p><strong>Doctor:</strong> ' + cita.doctor + '</p>';
                citasHtml += '<p><strong>Precio:</strong> ' + cita.precio + '</p>';
                citasHtml += '<hr />';
            });
            $('#citas').html(citasHtml);
        }).fail(function (error) {
            console.log(error);
            alert('Ocurrió un error al obtener el expediente');
        });
    };

    function obtenerCorreoPacienteDesdeURL() {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('correoPaciente');
    }
}

$(document).ready(function () {
    var view = new MostrarExpediente();
    view.InitView();
});