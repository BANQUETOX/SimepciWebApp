$(document).ready(function () {
    // Obtener y poblar la tabla de especialidades médicas al cargar la página
    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/EspecialidadMedica/GetAllEspecialidadesMedicas',
        method: 'GET',
        success: function (data) {
            poblarTabla(data);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener datos del API:', error);
        }
    });

    // Función para poblar la tabla de especialidades médicas
    function poblarTabla(data) {
        var tbody = $('#tablaEspecialidades tbody');
        tbody.empty();

        data.forEach(function (especialidad) {
            var fila = $('<tr>');

            fila.append($('<td>').text(especialidad.id));
            fila.append($('<td>').text(especialidad.nombre));
            fila.append($('<td>').text(especialidad.costoCita));

            var botonEditar = $('<button>').text('Editar').addClass('editar-btn');
            fila.append($('<td>').append(botonEditar));

            tbody.append(fila);
        });

        // Evento click para el botón "Editar"
        $('#tablaEspecialidades').on('click', '.editar-btn', function () {
            var fila = $(this).closest('tr');
            var idEspecialidad = fila.find('td:first-child').text();

            // Mostrar modal para editar el precio
            Swal.fire({
                title: 'Editar Precio',
                html: '<input type="number" id="nuevoPrecio" placeholder="Nuevo precio" min="0">',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                preConfirm: () => {
                    return $('#nuevoPrecio').val();
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    var nuevoPrecio = result.value;
                    enviarNuevoPrecio(idEspecialidad, nuevoPrecio);
                }
            });
        });

        // Botón "Registrar nueva especialidad"
        $('#registrarEspecialidadBtn').click(function () {
            // Mostrar modal para registrar nueva especialidad
            Swal.fire({
                title: 'Registrar Nueva Especialidad',
                html: '<input id="nombreEspecialidad" class="swal2-input" placeholder="Nombre de la especialidad">' +
                    '<input id="precioEspecialidad" class="swal2-input" type="number" placeholder="Precio de la especialidad">',
                showCancelButton: true,
                confirmButtonText: 'Registrar',
                cancelButtonText: 'Cancelar',
                preConfirm: () => {
                    return {
                        nombre: $('#nombreEspecialidad').val(),
                        costoCita: $('#precioEspecialidad').val()
                    };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    var datosEspecialidad = result.value;
                    enviarNuevaEspecialidad(datosEspecialidad);
                }
            });
        });
    }

    // Función para enviar el nuevo precio al API
    function enviarNuevoPrecio(idEspecialidad, nuevoPrecio) {
        var url = 'https://simepciapii.azurewebsites.net/api/EspecialidadMedica/ActualizarPrecioEspecialidad?idEspecialidad=' + idEspecialidad + '&nuevoPrecio=' + nuevoPrecio;

        $.ajax({
            url: url,
            method: 'PATCH',
            success: function (response) {
                console.log('Precio actualizado correctamente.');
                Swal.fire({
                    icon: 'success',
                    title: 'Información actualizada',
                    text: 'El precio se ha actualizado correctamente.',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
                        location.reload();
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error('Error al actualizar el precio:', error);
            }
        });
    }

    // Función para enviar una nueva especialidad al API
    function enviarNuevaEspecialidad(datosEspecialidad) {
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/EspecialidadMedica/CrearEspecialidadMedica',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datosEspecialidad),
            success: function (response) {
                console.log('Especialidad registrada correctamente.');
                Swal.fire({
                    icon: 'success',
                    title: 'Especialidad Registrada',
                    text: 'La especialidad se ha registrado correctamente.',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    location.reload();
                });
            },
            error: function (xhr, status, error) {
                console.error('Error al registrar la nueva especialidad:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al registrar la nueva especialidad.',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
});