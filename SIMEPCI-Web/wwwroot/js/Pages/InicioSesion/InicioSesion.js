function InicioSesion() {
    this.InitView = function () {

        $('#btnIniciarSesion').click(function () {

            var view = new InicioSesion();
            view.IniciarSesion();
        });
    }

    this.IniciarSesion = function () {
        var correo = $('#txtEmail').val().trim();
        var password = $('#txtPassword').val().trim();
        if (correo == "" || password == "") {
            Swal.fire({
                icon: 'error',
                title: 'Ha ocurrido un error',
                text: 'Llenar la informacion para el inicio de sesión'
            })
        }
        this.limpiarCampos();
    };
    this.limpiarCampos = function () {
        $('#txtPassword').val("");
        $('#txtEmail').val("");
    };
}
$(document).ready(function () {
    var view = new InicioSesion();
    view.InitView();
});