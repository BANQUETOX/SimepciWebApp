$(document).ready(function () {
    $('#notaEnfermeriaForm').submit(function (event) {
        event.preventDefault();
        var correo = $('#correoPaciente').val();
        buscarPaciente(correo);
    });

    $('#registrarNotaEnfermeriaForm').submit(function (event) {
        event.preventDefault();
        var correo = $('#correoPaciente').val();
        var contenido = $('#contenido').val();
        var fechaEmision = new Date().toISOString();
        var notaEnfermeria = {
            correoPaciente: correo,
            contenido: contenido,
            fechaEmision: fechaEmision
        };
        registrarNotaEnfermeria(notaEnfermeria);
    });

    function buscarPaciente(correo) {
        $('#notaEnfermeriaContainer').show();
    }

    function registrarNotaEnfermeria(notaEnfermeria) {
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Expediente/adjuntarNotaEnfermeria',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(notaEnfermeria),
            success: function (response) {
                console.log('Nota de enfermería registrada con éxito:', response);
                mostrarMensajeExito('La nota de enfermería se registró correctamente.');
                limpiarFormulario();
            },
            error: function (xhr, status, error) {
                console.error('Error al registrar la nota de enfermería:', error);
                mostrarMensajeError('Ocurrió un error al registrar la nota de enfermería.');
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