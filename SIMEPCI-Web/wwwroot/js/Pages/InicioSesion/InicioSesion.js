function InicioSesion() {
    var correo = $('#txtEmail').val().trim();
    var password = $('#txtPassword').val().trim();
    this.InitView = function () {
        $('#btnIniciarSesion').click(function () {
            var view = new InicioSesion();
            view.IniciarSesion();
            view.GetUserByEmail();
        });
    }
    this.IniciarSesion = function () {
        var url_base = 'https://simepciapii.azurewebsites.net/api/Usuario/Login';
        console.log(correo);
        console.log(password);
        console.log(url_base);
        console.log(sessionStorage.getItem('usuario'));
        $.ajax({
            url: url_base + '?correo=' + correo + '&password=' + password,
            method: 'GET',
            contentType: 'application/json;charset=utf-8',
            dataType: "json"
        }).done(function (result) {
            if (result.activo === true) {
                window.location = "/Perfil/Perfil";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de autenticación',
                    text: 'Correo o contraseña incorrectos, intentelo nuevamente'
                })
            }
        }).fail(function (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error de autenticación',
                text: 'Correo o contraseña incorrectos, intentelo nuevamente'
            })
        });
        this.limpiarCampos();
    };
    this.GetUserByEmail = function () {
        var url_base = 'https://simepciapii.azurewebsites.net/api/Usuario/GetUsuarioByCorreo?correo='
        $.ajax({
            url: url_base + correo,
            method: 'GET',
            contentType: 'application/json;charset=utf-8',
            dataType: "json"
        }).done(function (result) {
            console.log(result);
            if (result) {
                sessionStorage.setItem('usuario', JSON.stringify(result))
            }
        }).fail(function (error) {
            console.log(error);
        });
    }
    this.limpiarCampos = function () {
        $('#txtPassword').val("");
        $('#txtEmail').val("");
    };
}
$(document).ready(function () {
    var view = new InicioSesion();
    view.InitView();
});