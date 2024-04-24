﻿function Layout() {
    this.InitView = function () {
        console.log(sessionStorage.getItem('usuario'));
        console.log(sessionStorage.getItem('rol'));
        console.log(sessionStorage.getItem('id'));

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
            var registrarExpediente = document.getElementById('article-registrarExpediente');
            var mostrarExpediente = document.getElementById('article-mostrarExpediente');
            var editarPerfil = document.getElementById('article-EditarPerfil');
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
                    mostrarElemento(registrarExpediente, false);
                    mostrarElemento(subirExamenes, false);
                    break;
                case 'Enfermero':
                    mostrarElemento(editarPerfil, false);
                    mostrarElemento(configuraciones, false);
                    mostrarElemento(registroSedes, false);
                    mostrarElemento(gestionInformacion, false);
                    mostrarElemento(reportes, false);
                    mostrarElemento(agendarCita, false);
                    mostrarElemento(historialCitas, false);
                    mostrarElemento(misRecetas, false);
                    mostrarElemento(citasYFacturas, false);
                    mostrarElemento(misExamenes, false);
                    mostrarElemento(registrarReceta, false);
                    mostrarElemento(misCitas, false);
                    mostrarElemento(subirRecetas, false);
                    break;
                case 'Administrador':
                    mostrarElemento(editarPerfil, false);
                    mostrarElemento(registrarExpediente, false);
                    mostrarElemento(mostrarExpediente, false);
                    mostrarElemento(agendarCita, false);
                    mostrarElemento(historialCitas, false);
                    mostrarElemento(misRecetas, false);
                    mostrarElemento(citasYFacturas, false);
                    mostrarElemento(misExamenes, false);
                    mostrarElemento(registrarReceta, false);
                    mostrarElemento(subirExamenes, false);
                    mostrarElemento(subirRecetas, false);
                    break;
                case 'Secretario':  
                    mostrarElemento(editarPerfil, false);
                    mostrarElemento(registrarExpediente, false);
                    mostrarElemento(historialCitas, false);
                    mostrarElemento(misRecetas, false);
                    mostrarElemento(citasYFacturas, false);
                    mostrarElemento(misExamenes, false);
                    mostrarElemento(registrarReceta, false);
                    mostrarElemento(subirExamenes, false);
                    mostrarElemento(subirRecetas, false);
                    mostrarElemento(configuraciones, false);
                    mostrarElemento(registroSedes, false);
                    mostrarElemento(gestionInformacion, false);
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