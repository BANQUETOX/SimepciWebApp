$(document).ready(function () {

    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/Doctor/GetAllDoctores',
        method: 'GET',
        success: function (data) {
            poblarTabla(data);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener datos del API:', error);
        }
    });

    function poblarTabla(data) {
        var tbody = $('#tablaMedicos tbody');
        tbody.empty();

        data.forEach(function (info) {
            var fila = $('<tr>');

            fila.append($('<td>').text(info.nombreDoctor));
            fila.append($('<td>').text(info.nombreSede));
            fila.append($('<td>').text(info.nombreEspecialidad));
            fila.append($('<td>').text(info.horario));

            var botonEditar = $('<button>').text('Editar').addClass('editar-btn');
            fila.append($('<td>').append(botonEditar));

            tbody.append(fila);
        });

        // Evento click para el botón de editar
        $('#tablaMedicos').on('click', '.editar-btn', function () {
            var fila = $(this).closest('tr');
            var idDoctor = data[fila.index()].idDoctor;
            Swal.fire({
                title: 'Ingrese el nuevo horario:',
                html: `<p>Horarios actuales:</p>
                        <p>1: 6am-2pm</p>
                        <p>2: 2pm-10pm</p>
                        <p>3: 10pm-6am</p>`,
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true,
                preConfirm: (horario) => {
                    return $.ajax({
                        url: 'https://simepciapii.azurewebsites.net/api/Doctor/CambiarHorarioDoctror?idDoctor=' + idDoctor + '&horario=' + horario,
                        method: 'PATCH',
                        
                        success: function (response) {
                            Swal.fire({
                                title: 'Horario actualizado',
                                icon: 'success',
                                showConfirmButton: true,
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                        },
                        error: function (xhr, status, error) {
                            console.error('Error al enviar los datos al API:', error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Hubo un problema al guardar el horario. Por favor, inténtelo de nuevo más tarde.'
                            });
                        }
                    });
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    
                }
            });
        });
    }
});