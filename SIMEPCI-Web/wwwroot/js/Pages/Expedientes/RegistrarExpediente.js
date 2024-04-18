function RegistrarExpediente() {
    this.InitView = function () {
        $('#formRegistrarExpediente').submit(function (e) {
            e.preventDefault();
            var view = new RegistrarExpediente();
            view.RegistrarExpedienteAPI();
        });
    };

    this.RegistrarExpedienteAPI = function () {
        var expediente = {
            idPaciente: parseInt($('#idPaciente').val().trim()),
            notasEnfermeria: $('#notasEnfermeria').val().trim(),
            notasMedicas: $('#notasMedicas').val().trim(),
            historialMedico: $('#historialMedico').val().trim()
        };

        var url_base = 'https://simepciapii.azurewebsites.net/api/Expediente/CrearExpediente';

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: 'POST',
            url: url_base,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(expediente),
            hasContent: true
        }).done(function (result) {
            alert('Expediente registrado correctamente');
            window.location = '/Expedientes/VerificarRegistro';
        }).fail(function (error) {
            console.log(error);
            alert('Ocurrió un error al registrar el expediente');
        });
    };
}

$(document).ready(function () {
    var view = new RegistrarExpediente();
    view.InitView();
});