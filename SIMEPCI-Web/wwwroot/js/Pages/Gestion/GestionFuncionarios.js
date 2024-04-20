$(document).ready(function () {
    obtenerFuncionarios();

    function obtenerFuncionarios() {
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Usuario/GetAllUsers',
            method: 'GET',
            success: function (data) {
                poblarTabla(data);
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener datos del API:', error);
            }
        });
    }

    function poblarTabla(datos) {
        var tabla = $('#tablaFuncionarios tbody');
        tabla.empty();

        $.each(datos, function (index, funcionario) {
            var fila = $('<tr>');
            fila.append('<td>' + funcionario.nombre + ' ' + funcionario.primerApellido + ' ' + funcionario.segundoApellido + '</td>');
            fila.append('<td>' + funcionario.cedula + '</td>');
            fila.append('<td>' + funcionario.fechaNacimiento.split('T')[0] + '</td>');
            fila.append('<td>' + funcionario.telefono + '</td>');
            fila.append('<td>' + funcionario.correo + '</td>');
            fila.append('<td>' + funcionario.direccion + '</td>');
            fila.append('<td>' + funcionario.fotoPerfil + '</td>');
            fila.append('<td>' + funcionario.sexo + '</td>');

            var botonEditar = $('<button>').text('Editar').click(function () {
                mostrarModalEditar(funcionario);
            });
            var accionesCell = $('<td>').append(botonEditar);
            fila.append(accionesCell);

            tabla.append(fila);
        });
    }

    function mostrarModalEditar(funcionario) {
        $('#idUsuario').val(funcionario.id);
        $('#nombre').val(funcionario.nombre);
        $('#primerApellido').val(funcionario.primerApellido);
        $('#segundoApellido').val(funcionario.segundoApellido);
        $('#cedula').val(funcionario.cedula);
        $('#fechaNacimiento').val(funcionario.fechaNacimiento.split('T')[0]); // Formato YYYY-MM-DD
        $('#telefono').val(funcionario.telefono);
        $('#correo').val(funcionario.correo);
        $('#direccion').val(funcionario.direccion);
        $('#fotoPerfil').val(funcionario.fotoPerfil);
        $('#sexo').val(funcionario.sexo);
        $('#editarModal').css('display', 'block');
    }

    function cerrarModalEditar() {
        $('#editarModal').css('display', 'none');
    }

    $('.close').click(function () {
        cerrarModalEditar();
    });

    $(window).click(function (event) {
        if (event.target == $('#editarModal')[0]) {
            cerrarModalEditar();
        }
    });

    $('#editarForm').submit(function (event) {
        event.preventDefault();
        var datos = {
            idUsuario: parseInt($('#idUsuario').val()),
            nombre: $('#nombre').val(),
            primerApellido: $('#primerApellido').val(),
            segundoApellido: $('#segundoApellido').val(),
            cedula: $('#cedula').val(),
            fechaNacimiento: $('#fechaNacimiento').val(),
            telefono: $('#telefono').val(),
            correo: $('#correo').val(),
            direccion: $('#direccion').val(),
            fotoPerfil: $('#fotoPerfil').val(),
            sexo: $('#sexo').val()
        };

        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Usuario/UpdateUsuario',
            method: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            success: function (response) {
                console.log('Funcionario actualizado con éxito:', response);
                cerrarModalEditar();
                obtenerFuncionarios();
                mostrarMensajeExito();
            },
            error: function (xhr, status, error) {
                console.error('Error al actualizar el funcionario:', error);
                mostrarMensajeError(xhr.responseText);
            }
        });
    });

    function mostrarMensajeExito() {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'El funcionario se actualizó correctamente.',
            confirmButtonText: 'OK'
        });
    }

    function mostrarMensajeError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: mensaje || 'Ocurrió un error al actualizar el funcionario.',
            confirmButtonText: 'OK'
        });
    }
});