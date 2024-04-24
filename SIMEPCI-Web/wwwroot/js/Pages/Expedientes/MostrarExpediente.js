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

    // Lógica para habilitar la edición al hacer clic en el botón "Editar"
    $('.edit-btn').click(function () {
        var field = $(this).data('field');
        var textarea = $('#' + field);
        var isReadOnly = textarea.prop('readonly');

        if (isReadOnly) {
            textarea.prop('readonly', false);
            $(this).text('Guardar');
        } else {
            var nuevoValor = textarea.val();
            actualizarExpediente(field, nuevoValor);
        }
    });

    function actualizarExpediente(campo, valor) {
        var idExpediente = obtenerIdExpediente(); // Implementa esta función para obtener el ID del expediente

        var datos = {
            idExpediente: idExpediente
        };
        datos[campo] = valor;

        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Expediente/UpdateExpediente',
            method: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            success: function (response) {
                console.log('Expediente actualizado con éxito:', response);
                mostrarMensajeExito('El expediente se actualizó correctamente.');
            },
            error: function (xhr, status, error) {
                console.error('Error al actualizar el expediente:', error);
                mostrarMensajeError('Ocurrió un error al actualizar el expediente.');
            }
        });
    }

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