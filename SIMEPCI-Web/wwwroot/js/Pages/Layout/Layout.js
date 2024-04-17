﻿function Layout() {
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
        console.log(roles.length);
        if (roles.length == 8) {
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
                    configuraciones.style.display = 'none';
                    registroSedes.style.display = 'none';
                    gestionInformacion.style.display = 'none';
                    registrarReceta.style.display = 'none';
                    misExamenes.style.display = 'none';
                    break;
                case 'Enfermero':
                    configuraciones.style.display = 'none';
                    registroSedes.style.display = 'none';
                    gestionInformacion.style.display = 'none';
                    break;
                case 'Administrador':
                    misCitas.style.display = 'none';
                    misExamenes.style.display = 'none';
                    registrarReceta.style.display = 'none';
                    subirExamenes.style.display = 'none';
                    subirRecetas.style.display = 'none';
                    citasYFacturas.style.display = 'none';
                    agendarCita.style.display = 'none';
                    historialCitas.style.display = 'none';
                    historialPagos.style.display = 'none';
                    miExpediente.style.display = 'none';
                    misRecetas.style.display = 'none';
                    break;
                case 'Secretario':
                    configuraciones.style.display = 'none';
                    registroSedes.style.display = 'none';
                    gestionInformacion.style.display = 'none';
                    break;
                case 'Doctor':
                    configuraciones.style.display = 'none';
                    registroSedes.style.display = 'none';
                    gestionInformacion.style.display = 'none';
                    break;
                default:
                    break;
            }
        }
    };
}
$(document).ready(function () {
    var view = new Layout();
    view.InitView();
});