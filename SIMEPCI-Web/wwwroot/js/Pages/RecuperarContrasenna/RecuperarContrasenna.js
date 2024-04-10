$(document).ready(function () {
    $('#formEnviarOTP').submit(function (event) {
        event.preventDefault();

        var email = $('#email').val().trim();

        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/RecuperarPasswordOtp/CrearRecuperarPasswordOtp',
            method: 'POST',
            headers: {
                'accept': 'text/plain'
            },
            data: JSON.stringify({ correo: email }),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).done(function (result) {
            window.location.href = '/RecuperarContrasenna/ValidarOTP';
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
            console.error('Response:', jqXHR.responseJSON);

            var errorMessage = 'Ocurrió un error al enviar el OTP. Por favor, intente nuevamente.';

            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMessage = jqXHR.responseJSON.message;
            }

            alert(errorMessage);
        });
    });
});