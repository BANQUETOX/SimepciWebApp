function Layout() {
    this.InitView = function () {
        console.log(sessionStorage.getItem('usuario'));
        $('#btnLogout').click(function () {
            var view = new Layout();
            view.CerrarSesion();
        });

    }

    this.CerrarSesion = function () {
        sessionStorage.removeItem('usuario');
        window.location = ('/InicioSesion/InicioSesion');
    }
}

$(document).ready(function () {
    var view = new Layout();
    view.InitView();
});
