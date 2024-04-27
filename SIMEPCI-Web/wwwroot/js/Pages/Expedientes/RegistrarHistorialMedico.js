$(document).ready(function () {
    var rol = sessionStorage.getItem('rol');
    if (rol !== 'Doctor') {
        window.location.href = '/Home/Index';
    }

    $('#historialMedicoForm').submit(function (event) {
        event.preventDefault();
        var correo = $('#correoPaciente').val();
        buscarPaciente(correo);
    });

    $('#registrarHistorialMedicoForm').submit(function (event) {
        event.preventDefault();
        var correo = $('#correoPaciente').val();
        var contenido = $('#contenido').val();

        var historialMedico = {
            correoPaciente: correo,
            contenido: contenido
        };

        registrarHistorialMedico(historialMedico);
    });

    function buscarPaciente(correo) {

        $('#historialMedicoContainer').show();
    }

    function registrarHistorialMedico(historialMedico) {
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Expediente/adjuntarHistorialMedico',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(historialMedico),
            success: function (response) {
                console.log('Antecedente médico registrado con éxito:', response);
                mostrarMensajeExito('El Antecedente médico se registró correctamente.');
                limpiarFormulario();
            },
            error: function (xhr, status, error) {
                console.error('Error al registrar el antecedente médico:', error);
                mostrarMensajeError('Ocurrió un error al registrar el antecedente médico.');
            }
        });
    }

    function limpiarFormulario() {
        $('#contenido').val('');
    }

    function mostrarMensajeExito(mensaje) {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: mensaje,
            confirmButtonText: 'OK'
        });
    }

    function mostrarMensajeError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: mensaje,
            confirmButtonText: 'OK'
        });
    }
});