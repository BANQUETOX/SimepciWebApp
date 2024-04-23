$(document).ready(function () {
    // Llamar al API para obtener los datos de las evaluaciones
    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/Comentario/getComentarios',
        method: 'GET',
        success: function (data) {
            poblarTabla(data);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener datos del API:', error);
        }
    });

    // Función para poblar la tabla con los datos obtenidos del API
    function poblarTabla(data) {
        var tbody = $('#tablaEvaluacion tbody');
        tbody.empty();

        data.forEach(function (evaluacion) {
            var fila = $('<tr>');

            fila.append($('<td>').text(evaluacion.id));
            fila.append($('<td>').text(evaluacion.satisfaccion));
            fila.append($('<td>').text(evaluacion.profecionalismo));
            fila.append($('<td>').text(evaluacion.instalaciones));
            fila.append($('<td>').text(evaluacion.recomendaria ? 'Sí' : 'No'));
            fila.append($('<td>').text(evaluacion.comentarios));

            tbody.append(fila);
        });
    }
});
