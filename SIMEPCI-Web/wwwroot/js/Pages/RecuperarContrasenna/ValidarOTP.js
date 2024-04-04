$(document).ready(function () {
    $('#formValidarOTP').submit(function (event) {
        event.preventDefault();

        var otp = $('#otp').val().trim();

        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/RecuperarPasswordOtp/ValidarPasswordOtp',
            method: 'POST',
            headers: {
                'accept': 'text/plain'
            },
            data: JSON.stringify({ otp: otp }),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).done(function (result) {
            window.location.href = '/RecuperarContrasenna/CrearNuevaContrasenna';
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
            console.error('Response:', jqXHR.responseJSON);

            var errorMessage = 'El OTP ingresado no es válido. Por favor, intente nuevamente.';

            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMessage = jqXHR.responseJSON.message;
            }

            alert(errorMessage);
        });
    });
});