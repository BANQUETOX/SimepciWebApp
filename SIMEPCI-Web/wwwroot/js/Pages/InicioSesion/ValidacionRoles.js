function ValidacionRoles() {
    var rolSeleccionado = '';
    this.InitView = function () {
        var view = new ValidacionRoles();
        view.ValidarRoles();
        $('#btnRol').click(function () {
            var view = new ValidacionRoles();
            view.ElegirRol();
        })
    }
    this.ValidarRoles = function () {
        var rolesString = sessionStorage.getItem('roles');
        var roles = rolesString.split(',');
        console.log(sessionStorage.getItem('roles'));

        var listaRoles = document.getElementById('ValidacionRoles');
        var select = document.createElement('select');
        roles.forEach(function (rol) {
            var option = document.createElement('option');
            option.text = rol;
            option.id = rol;
            select.add(option);
        });
        listaRoles.appendChild(select);
    }
    this.ElegirRol = function () {
        var select = document.querySelector('#ValidacionRoles select');
        rolSeleccionado = select.options[select.selectedIndex].text;
        sessionStorage.setItem('rol',rolSeleccionado)
        console.log(rolSeleccionado);
        window.location = '/Perfil/Perfil'
    }
}
$(document).ready(function () {
    var view = new ValidacionRoles();
    view.InitView();
});
