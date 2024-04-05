function CrearNuevaContrasenna() {
    var correo = $('#email').val().trim();
    var password = $('#nuevaContrasenna').val().trim();
    var newPassword = $('#confirmNuevaContrasenna').val().trim();
    this.InitView = function () {
        $('#btnCambiarContr').click(function () {
            var view = new CrearNuevaContrasenna();
            view.EnviarOtp();
        });
    }
    this.CambiarContrasenna = function () {
        var validacion = this.ValidarContrasenna();
        if (validacion) {
            var data = {
                email: correo;
                password: password
            }
            $('#espera').show();
            url_base = 'https://simepciapii.azurewebsites.net/api/Usuario/ActualizarPassword'
            $.ajax({
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: 'PATCH',
                url: url_base + '?correoUsuario=' + correo + '&newpassword=' + password,
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(data),
                hasContent: true
            }).done(function (result) {
                if (result) {
                    window.location = '/InicioSesion/InicioSesion'
                }
            }).fail(function (error) {
                console.log(error)
            }).always(function () {
                $('#espera').hide();
            });
        } else {

        }
    }
    this.ValidarContrasenna = function () {
        return password === newPassword
    }
}
$(document).ready(function () {
    var view = new CrearNuevaContrasenna();
    view.InitView();
});