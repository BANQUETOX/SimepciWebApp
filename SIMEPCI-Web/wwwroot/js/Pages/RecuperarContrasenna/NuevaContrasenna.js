function NuevaContrasenna() {
    var correo, contrasenna, newPassword;

    this.InitView = function () {
        $('#btnCambiarContr').click(function () {
            var view = new NuevaContrasenna();
            view.ValidarContrasenna(correo, contrasenna, newPassword);
        });
    }

    this.CambiarContrasenna = function (correo, contrasenna) {
        var data = {
            email: correo,
            password: contrasenna
        }
        $('#espera').show();
        url_base = 'https://simepciapii.azurewebsites.net/api/Usuario/ActualizarPassword'
        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: 'PATCH',
            url: url_base + '?correoUsuario=' + correo + '&newpassword=' + contrasenna,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data),
            hasContent: true
        }).done(function (result) {
            if (result) {
                Swal.fire({
                    title: "¡Contraseña cambiada!",
                    text: "La contraseña se ha cambiado exitosamente.",
                    icon: "success"
                }).then(function () {
                    window.location = '/InicioSesion/InicioSesion';
                });
            }
        }).fail(function (error) {
            console.log(error);
        }).always(function () {
            $('#espera').hide();
        });
    }

    this.ValidarContrasenna = function (correo, contrasenna, newPassword) {
        var contrasenna = $('#nuevaContrasenna').val();
        var newPassword = $('#confirmarContrasenna').val();

        
        var req = /^(?=.*[A-Z])(?=.*[\d!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

        if (contrasenna === newPassword) {
            if (!req.test(contrasenna)) {
                Swal.fire({
                    title: "Error",
                    text: "La contraseña debe tener solo 8 caracteres, una mayúscula y un dígito o símbolo.",
                    icon: "error"
                });
                return;
            }

            var correo = $('#email').val();
            this.CambiarContrasenna(correo, contrasenna);
        } else {
            Swal.fire({
                title: "Error",
                text: "Las contraseñas no coinciden",
                icon: "error"
            });
        }
    };
}

$(document).ready(function () {
    var view = new NuevaContrasenna();
    view.InitView();
});


