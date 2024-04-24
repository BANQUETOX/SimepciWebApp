$(document).ready(function () {

    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/Sede/GetAllSedes',
        method: 'GET',
        success: function (data) {

            poblarTabla(data);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener datos del API:', error);
        }
    });


    function poblarTabla(data) {
        var tbody = $('#tablaSedes tbody');
        tbody.empty();

        data.forEach(function (sede) {
            var fila = $('<tr>');

            fila.append($('<td>').text(sede.nombre));
            fila.append($('<td>').text(sede.descripcion));
            fila.append($('<td>').text(sede.fechaCreacion));

            var ubicacion = $('<a>')
                .attr('href', 'https://www.google.com/maps?q=' + sede.ubicacion)
                .attr('target', '_blank')
                .text('Ver Ubicación');

            fila.append($('<td>').append(ubicacion));

            fila.append($('<td>').text(sede.provincia));
            fila.append($('<td>').text(sede.canton));
            fila.append($('<td>').text(sede.distrito));

            var imagen = $('<a>')
                .attr('href', '#')
                .attr('name', sede.foto)
                .text('Ver imágen');
            fila.append($('<td>').append(imagen));


            var botonEditar = $('<button>').text('Editar').addClass('editar-btn');
            fila.append($('<td>').append(botonEditar));

            tbody.append(fila);
        });

        // Evento click para el botón de editar
        $('#tablaSedes').on('click', '.editar-btn', function () {

        });
    }
});