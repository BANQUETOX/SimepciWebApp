function ValidarOTP() {
    this.InitView = function () {
        $('#btnValidarOtp').click(function () {
            var view = new ValidarOTP();
            view.ValidarOtp();
        });
    }

    this.ValidarOtp = function () {
        var mail = $('#email').val();
        var otp = $('#otp').val();
        var data = {
            correo: mail,
            otpInput:otp
        };
        $('#espera').show();
        url_base = 'https://simepciapii.azurewebsites.net/api/RecuperarPasswordOtp/ValidarPasswordOtp';
        $.ajax({
            headers: {
                'Accept': "text/plain",
                'Content-Type': "application/json"
            },
            method: 'GET',
            url: url_base+'?correo='+correo+'&otpInput='+otp,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data),
            hasContent: true
        }).done(function (result) {
            if (result === "true") {
                window.location = '/RecuperarContrasenna/CrearNuevaContrasenna';
            } else {
                alert('El OTP no es válido');
            }
        }).fail(function (error) {
            console.log(error);
            alert('Ocurrió un error al validar el OTP');
        }).always(function () {
            $('#espera').hide();
        });
    }
}

$(document).ready(function () {
    var view = new ValidarOTP();
    view.InitView();
});