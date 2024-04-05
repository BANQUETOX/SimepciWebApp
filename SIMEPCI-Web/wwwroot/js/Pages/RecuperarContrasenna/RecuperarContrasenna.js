function RecuperarContrasenna() {
    this.InitView = function () {
        $('#btnOtp').click(function () {
            var view = new RecuperarContrasenna();
            view.EnviarOtp();
        });
    }
    this.EnviarOtp = function () {
        var correo = $('#email').val();
        console.log(correo);
        var emailJson = {}
        emailJson.email = correo;
        $('#espera').show();
        url_base = 'https://simepciapii.azurewebsites.net/api/RecuperarPasswordOtp/CrearRecuperarPasswordOtp'
        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: 'POST',
            url: url_base + '?correo=' + correo,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(emailJson),
            hasContent: true
        }).done(function (result) {
            if (result) {
                window.location = '/RecuperarContrasenna/ValidarOTP'
            }
        }).fail(function (error) {
            console.log(error)
        }).always(function () {
            $('#espera').hide();
        });
    }
}
$(document).ready(function () {
    var view = new RecuperarContrasenna();
    view.InitView();
});