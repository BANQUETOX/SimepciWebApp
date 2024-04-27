$(document).ready(function () {
    var rol = sessionStorage.getItem('rol');

    if (rol !== 'Doctor' && rol !== 'Enfermero') {
        window.location.href = '/Home/Index';
    }

    $('#notaMedicaForm').submit(function (event) {
        event.preventDefault();
        var correo = $('#correoPaciente').val();
        buscarPaciente(correo);
    });

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
      
        $('#notaMedicaContainer').show();
    }

    function registrarNotaMedica(notaMedica) {
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Expediente/adjuntarNotaMedica',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(notaMedica),
            success: function (response) {
                console.log('Nota médica registrada con éxito:', response);
                mostrarMensajeExito('La nota médica se registró correctamente.');
                limpiarFormulario();
            },
            error: function (xhr, status, error) {
                console.error('Error al registrar la nota médica:', error);
                mostrarMensajeError('Ocurrió un error al registrar la nota médica.');
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