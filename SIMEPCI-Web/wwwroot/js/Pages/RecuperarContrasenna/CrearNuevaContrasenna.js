function CrearNuevaContrasenna() {
    this.InitView = function () {
        $('#btnCrearNuevaContrasenna').click(function () {
            var view = new CrearNuevaContrasenna();
            view.CrearNuevaContrasenna();
        });
    }

    this.CrearNuevaContrasenna = function () {
        var nuevaContrasenna = $('#nuevaContrasenna').val();
        var confirmarContrasenna = $('#confirmarContrasenna').val();

        if (nuevaContrasenna !== confirmarContrasenna) {
            alert('Las contraseñas no coinciden');
            return;
        }

        var contrasennaJson = {};
        contrasennaJson.nuevaContrasenna = nuevaContrasenna;
        $('#espera').show();
        url_base = 'https://simepciapii.azurewebsites.net/api/RecuperarPasswordOtp/CrearNuevaContrasenna';
        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: 'POST',
            url: url_base,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(contrasennaJson),
            hasContent: true
        }).done(function (result) {
            if (result) {
                alert('Contraseña actualizada exitosamente');
                window.location = '/InicioSesion';
            }
        }).fail(function (error) {
            console.log(error);
        }).always(function () {
            $('#espera').hide();
        });
    }
}

$(document).ready(function () {
    var view = new CrearNuevaContrasenna();
    view.InitView();
});