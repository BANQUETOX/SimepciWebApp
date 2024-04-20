function MostrarExpediente() {

    var idExpediente = 0;

    this.InitView = function () {

        idExpediente = obtenerIdExpedienteDesdeURL();

        var view = new MostrarExpediente();

        view.ObtenerExpediente();

    };

    this.ObtenerExpediente = function () {

        var url_base = 'https://simepciapii.azurewebsites.net/api/Expediente/ExpedienteCompletoPaciente';

        $.ajax({

            method: 'GET',

            url: url_base + '?idExpediente=' + idExpediente,

            dataType: 'json'

        }).done(function (result) {

            $('#idPaciente').text(result.infoExpediente.idPaciente);

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

    function obtenerIdExpedienteDesdeURL() {

        var urlParams = new URLSearchParams(window.location.search);

        return urlParams.get('id');

    }

}

$(document).ready(function () {

    var view = new MostrarExpediente();

    view.InitView();

});