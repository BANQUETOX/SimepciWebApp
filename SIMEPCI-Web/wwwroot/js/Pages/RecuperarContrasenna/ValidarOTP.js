function ValidarOTP() {
    this.InitView = function () {
        $('#btnValidarOtp').click(function () {
            var view = new ValidarOTP();
            view.ValidarOtp();
        });
    }

    this.ValidarOtp = function () {
        var otp = $('#otp').val();
        var correo = localStorage.getItem('correo');
        console.log("Correo: " + correo);
        console.log("OTP: " + otp);
        $('#espera').show();
        url_base = 'https://simepciapii.azurewebsites.net/api/RecuperarPasswordOtp/ValidarPasswordOtp';
        var url = url_base + '?correo=' + encodeURIComponent(correo) + '&otpInput=' + encodeURIComponent(otp);
        console.log("URL antes de AJAX: " + url);
        $.ajax({
            method: 'GET',
            url: url,
            dataType: 'json'
        }).done(function (result) {
            console.log(result);
            if (result === true) {
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