function Layout() {
    this.InitView = function () {
        console.log(sessionStorage.getItem('usuario'));
        console.log(sessionStorage.getItem('rol'));
        $('#btnLogout').click(function () {
            var view = new Layout();
            view.CerrarSesion();
        });
        $('#btnCambiarRol').click(function () {
            var view = new Layout();
            view.CambiarRol();
        });
        this.CambiarUSuario();
        this.InfoRol();
    }
    this.CerrarSesion = function () {
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('rol');
        sessionStorage.clear();
        window.location = ('/InicioSesion/InicioSesion');
    }
    this.CambiarRol = function () {
        window.location = "/InicioSesion/ValidacionRol";
    }
    this.CambiarUSuario = function () {
        var btnRoles = document.getElementById('btnCambiarRol');
        var roles = sessionStorage.getItem('roles');
        console.log(btnRoles);
        console.log(roles);
        if (roles && roles.length === 8) {
            btnRoles.style.display = 'none';
        } else {
            btnRoles.style.display = 'inline';
        }
    }
    this.InfoRol = function () {
        var vista = window.location.href;
        if (vista.includes('/Perfil/Perfil')) {
            var rol = sessionStorage.getItem('rol');
            var agendarCita = document.getElementById('article-agendarCita');
            var historialCitas = document.getElementById('article-historialCitas');
            var miExpediente = document.getElementById('article-miExpediente');
            var misRecetas = document.getElementById('article-misRecetasMedicas');
            var configuraciones = document.getElementById('article-configuraciones');
            var registroSedes = document.getElementById('articulo-registroSedes');
            var gestionInformacion = document.getElementById('article-gestionInformacion');
            var citasYFacturas = document.getElementById('article-pagoCitasYFacturas');
            var misExamenes = document.getElementById('article-misExamenes');
            var registrarReceta = document.getElementById('article-registrarReceta');
            var misCitas = document.getElementById('article-misCitas');
            var reportes = document.getElementById('article-reportes');
            var subirExamenes = document.getElementById('article-subirExamenes');
            var subirRecetas = document.getElementById('article-subirRecetas');
            switch (rol) {
                case 'Paciente':
                    mostrarElemento(configuraciones, false);
                    mostrarElemento(registroSedes, false);
                    mostrarElemento(gestionInformacion, false);
                    mostrarElemento(registrarReceta, false);
                    mostrarElemento(misExamenes, false);
                    break;
                case 'Enfermero':
                    mostrarElemento(configuraciones, false);
                    mostrarElemento(registroSedes, false);
                    mostrarElemento(gestionInformacion, false);
                    mostrarElemento(reportes, false);
                    break;
                case 'Administrador':
                    mostrarElemento(misExamenes, false);
                    mostrarElemento(registrarReceta, false);
                    mostrarElemento(subirExamenes, false);
                    mostrarElemento(subirRecetas, false);
                    mostrarElemento(citasYFacturas, false);
                    mostrarElemento(agendarCita, false);
                    mostrarElemento(historialCitas, false);
                    mostrarElemento(historialPagos, false);
                    mostrarElemento(miExpediente, false);
                    mostrarElemento(misRecetas, false);
                    break;
                case 'Secretario':
                    mostrarElemento(configuraciones, false);
                    mostrarElemento(registroSedes, false);
                    mostrarElemento(gestionInformacion, false);
                    mostrarElemento(misCitas, false);
                    mostrarElemento(reportes, false);
                    break;
                case 'Doctor':
                    mostrarElemento(configuraciones, false);
                    mostrarElemento(registroSedes, false);
                    mostrarElemento(gestionInformacion, false);
                    break;
                default:
                    break;
            }
        }
    };

    function mostrarElemento(elemento, mostrar) {
        if (elemento) {
            elemento.style.display = mostrar ? 'block' : 'none';
        }
    }
}
$(document).ready(function () {
    var view = new Layout();
    view.InitView();
});