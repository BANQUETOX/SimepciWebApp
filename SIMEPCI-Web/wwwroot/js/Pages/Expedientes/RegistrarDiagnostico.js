$(document).ready(function () {
    var rol = sessionStorage.getItem('rol');
    if (rol !== 'Doctor') {
        window.location.href = '/Home/Index';
    }

    $('#diagnosticoForm').submit(function (event) {
        event.preventDefault();
        var correo = $('#correoPaciente').val();
        buscarPaciente(correo);
    });

    $('#registrarDiagnosticoForm').submit(function (event) {
        event.preventDefault();
        var correo = $('#correoPaciente').val();
        var descripcion = $('#descripcion').val();
        var fechaEmision = new Date().toISOString();
        var diagnostico = {
            correoPaciente: correo,
            descripcion: descripcion,
            fechaEmision: fechaEmision
        };
        registrarDiagnostico(diagnostico);
    });

    function buscarPaciente(correo) {
        $('#diagnosticoContainer').show();
    }

    function registrarDiagnostico(diagnostico) {
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Diagnostico/CrearDiagnostico',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(diagnostico),
            success: function (response) {
                console.log('Diagnóstico registrado con éxito:', response);
                mostrarMensajeExito('El diagnóstico se registró correctamente.');
                limpiarFormulario();
            },
            error: function (xhr, status, error) {
                console.error('Error al registrar el diagnóstico:', error);
                mostrarMensajeError('Ocurrió un error al registrar el diagnóstico.');
            }
        });
    }

    function limpiarFormulario() {
        $('#nombre').val('');
        $('#descripcion').val('');
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