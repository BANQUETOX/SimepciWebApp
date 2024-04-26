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
            fila.append('<td>' + funcionario.correo + '</td>');
            fila.append('<td>' + (funcionario.activo ? 'Activo' : 'Inactivo') + '</td>');

            var roles = funcionario.roles.join(', ');
            fila.append('<td>' + roles + '</td>');

            var botonText = funcionario.activo ? 'Desactivar usuario' : 'Activar usuario';
            var botonEditar = $('<button>').text(botonText).click(function () {
                Swal.fire({
                    title: '¿Estás seguro de querer cambiar el estado del usuario?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sí',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        var urlActivar = 'https://simepciapii.azurewebsites.net/api/Usuario/ActivarUsuario';
                        var urlDesactivar = 'https://simepciapii.azurewebsites.net/api/Usuario/DesactivarUsuario';
                        cambiarEstadoUsuario(funcionario.correo, !funcionario.activo, urlActivar, urlDesactivar);
                    }
                });
            });
            var accionesCell = $('<td>').append(botonEditar);
            fila.append(accionesCell);

            var botonRoles = $('<button>').text('Gestionar Roles').click(function () {
                Swal.fire({
                    title: '¿Qué acción deseas realizar?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Asignar',
                    cancelButtonText: 'Eliminar',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Si el usuario elige asignar
                        Swal.fire({
                            title: '¿Qué rol deseas asignar?',
                            input: 'select',
                            inputOptions: {
                                '1': 'Admin',
                                '2': 'Doctor',
                                '3': 'Secretario',
                                '4': 'Enfermero'
                            },
                            inputPlaceholder: 'Selecciona un rol',
                            showCancelButton: true,
                            confirmButtonText: 'Confirmar',
                            cancelButtonText: 'Cancelar',
                            inputValidator: (value) => {
                                return new Promise((resolve) => {
                                    if (value !== '') {
                                        resolve();
                                    } else {
                                        resolve('Debes seleccionar un rol');
                                    }
                                });
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // Si el usuario selecciona un rol
                                var idRol = result.value;
                                var correoUsuario = funcionario.correo;

                                if (idRol === '2') {
                                    // Si el usuario selecciona "Doctor"
                                    Swal.fire({
                                        title: 'Ingresa los siguientes datos para el rol Doctor',
                                        html:
                                            '<input id="especialidad" class="swal2-input" placeholder="ID Especialidad" min="0">' +
                                            '<input id="sede" class="swal2-input" placeholder="ID Sede" min="0">' +
                                            '<input id="horario" class="swal2-input" placeholder="Horario" min="0">',
                                        showCancelButton: true,
                                        confirmButtonText: 'Confirmar',
                                        cancelButtonText: 'Cancelar',
                                        preConfirm: () => {
                                            return {
                                                especialidad: $('#especialidad').val(),
                                                sede: $('#sede').val(),
                                                horario: $('#horario').val()
                                            };
                                        },
                                        didOpen: () => {
                                            $('#especialidad').focus();
                                        },
                                        inputValidator: (value) => {
                                            if (!value.especialidad || !value.sede || !value.horario) {
                                                return 'Debes ingresar todos los datos';
                                            }
                                        }
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            // Si el usuario ingresa los datos requeridos
                                            var datosDoctor = result.value;
                                            asignarRolDoctor(correoUsuario, datosDoctor);
                                        }
                                    });
                                } else {
                                    // Si el usuario selecciona otro rol
                                    gestionarRoles(correoUsuario, idRol, 'asignar');
                                }
                            }
                        });
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        // Si el usuario elige eliminar
                        Swal.fire({
                            title: '¿Qué rol deseas eliminar?',
                            html:
                                '<p>1: Admin</p>' +
                                '<p>2: Doctor</p>' +
                                '<p>3: Secretario</p>' +
                                '<p>4: Enfermero</p>',
                            input: 'text',
                            inputPlaceholder: 'Ingresa el ID del rol',
                            showCancelButton: true,
                            confirmButtonText: 'Confirmar',
                            cancelButtonText: 'Cancelar',
                            inputValidator: (value) => {
                                return new Promise((resolve) => {
                                    if (value !== '') {
                                        resolve();
                                    } else {
                                        resolve('Debes ingresar el ID del rol');
                                    }
                                });
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                               
                                var idRol = result.value;
                                var id = funcionario.id; 
                                eliminarRol(id, idRol);
                            }
                        });;
                    }
                });
            });
            var cellBotonRoles = $('<td>').append(botonRoles);
            fila.append(cellBotonRoles);

            tabla.append(fila);
        });
    }

    function cambiarEstadoUsuario(correoUsuario, nuevoEstado, urlActivar, urlDesactivar) {
        var url = nuevoEstado ? urlActivar : urlDesactivar;

        $.ajax({
            url: url + '?correoUsuario=' + encodeURIComponent(correoUsuario),
            method: 'PATCH',
            success: function () {
                obtenerFuncionarios();
            },
            error: function (xhr, status, error) {
                console.error('Error al cambiar el estado del usuario:', error);
            }
        });
    }

    function asignarRolDoctor(correoUsuario, datosDoctor) {
        var info = {
            correoUsuario: correoUsuario,
            idEspecialidad: datosDoctor.especialidad,
            idSede: datosDoctor.sede,
            horario: datosDoctor.horario
        };

        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Rol/AsignarRolDoctor',
            method: 'POST',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(info),
            success: function (response) {
                
                console.log('Rol de Doctor asignado correctamente:', response);
                Swal.fire('¡Rol de Doctor asignado correctamente!', '', 'success');
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            },
            error: function (xhr, status, error) {
                
                console.error('Error al asignar el rol de Doctor:', error);
                Swal.fire('Error', 'Hubo un problema al asignar el rol de Doctor', 'error');
            }
        });
    }

    function gestionarRoles(correoUsuario, idRol) {
        var url = 'https://simepciapii.azurewebsites.net/api/Rol/AsignarRolUsuario?correoUsuario=' + encodeURIComponent(correoUsuario) + '&idRol=' + idRol;

        $.ajax({
            url: url,
            method: 'POST',
            success: function (response) {
                
                console.log('Rol asignado correctamente:', response);
                Swal.fire('¡Rol asignado correctamente!', '', 'success');
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            },
            error: function (xhr, status, error) {
               
                console.error('Error al asignar el rol:', error);
                Swal.fire('Error', 'Hubo un problema al asignar el rol', 'error');
            }
        });
    }

    function eliminarRol(idUsuario, idRol) {
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Rol/RemoverRolUsuario?idUsuario=' + idUsuario + '&idRol=' + idRol,
            method: 'POST',
            success: function (response) {
                
                console.log('Rol eliminado correctamente:', response);
                Swal.fire('¡Rol eliminado correctamente!', '', 'success');
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            },
            error: function (xhr, status, error) {
                
                console.error('Error al eliminar el rol:', error);
                Swal.fire('Error', 'Hubo un problema al eliminar el rol', 'error');
            }
        });
    }
});


















