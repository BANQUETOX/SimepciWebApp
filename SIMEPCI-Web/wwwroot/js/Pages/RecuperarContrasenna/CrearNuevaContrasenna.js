$(document).ready(function () {
    $('#formCrearNuevaContrasenna').submit(function (event) {
        event.preventDefault();

        var nuevaContrasenna = $('#nuevaContrasenna').val().trim();
        var confirmarContrasenna = $('#confirmarContrasenna').val().trim();

        if (nuevaContrasenna !== confirmarContrasenna) {
            alert('Las contraseñas no coinciden. Por favor, inténtelo nuevamente.');
            return;
        }

        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Usuario/ActualizarPassword',
            method: 'POST',
            headers: {
                'accept': '*/*'
            },
            data: JSON.stringify({ password: nuevaContrasenna }),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).done(function (result) {
            window.location.href = '/InicioSesion/InicioSesion';
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
            console.error('Response:', jqXHR.responseJSON);

            var errorMessage = 'Ocurrió un error al actualizar la contraseña. Por favor, intente nuevamente.';

            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMessage = jqXHR.responseJSON.message;
            }

            alert(errorMessage);
        });
    });
});