function RecuperarContrasenna() {
    this.InitView = function () {
        $('#btnOtp').click(function () {
            var view = RecuperarContrasenna();
            view.EnviarOtp();
        });
    }
    this.EnviarOtp() = function () {
        var correo = $('#email').val().trim();
        var emailJson = {}
        emailJson.email = correo;
        url_base = 'https://simepciapii.azurewebsites.net/api/RecuperarPasswordOtp/CrearRecuperarPasswordOtp';
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
            hasContent:true     
        }).done(function (result) {
            console.log(result)
        }).then(
            window.location = '/RecuperarContrasenna/Confirmacion'
        ).fail(function (error) {
            console.log(error)
        });
    }
}
$(document).ready(function () {
    var view = new RecuperarContrasenna();
    view.InitView();
});