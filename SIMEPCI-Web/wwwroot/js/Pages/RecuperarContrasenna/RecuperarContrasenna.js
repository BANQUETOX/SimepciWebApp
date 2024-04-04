$(document).ready(function () {
    $('#formRecuperarContrasenna').submit(function (event) {
        event.preventDefault();

        var email = $('#email').val().trim();
        var url_base = 'https://simepciapii.azurewebsites.net/api/Usuario/GetUsuarioByCorreo';

        $.ajax({
            url: url_base + '?correo=' + encodeURIComponent(email),
            method: 'GET',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).done(function (result) {
            if (result.activo === true) {
                console.log(email); // Verificar el correo electrónico capturado

                var url_otp = 'https://simepciapii.azurewebsites.net/api/RecuperarPasswordOtp/CrearRecuperarPasswordOtp';

                $.ajax({
                    url: url_otp + '?correo=' + encodeURIComponent(email),
                    method: 'POST',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json'
                }).done(function (result) {
                    window.location.href = '/RecuperarContrasenna/ValidarOTP';
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.error('Error:', textStatus, errorThrown);
                    console.error('Response:', jqXHR.responseText);

                    var errorMessage = 'Ocurrió un error al enviar el OTP. Por favor, intente nuevamente.';

                    if (jqXHR.responseText) {
                        errorMessage = jqXHR.responseText;
                    }

                    alert(errorMessage);
                });
            } else {
                alert('El correo electrónico no existe en la base de datos. Por favor, verifique el correo ingresado.');
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
            console.error('Response:', jqXHR.responseText);

            var errorMessage = 'Ocurrió un error al verificar el correo electrónico. Por favor, intente nuevamente.';

            if (jqXHR.responseText) {
                errorMessage = jqXHR.responseText;
            }

            alert(errorMessage);
        });
    });
});