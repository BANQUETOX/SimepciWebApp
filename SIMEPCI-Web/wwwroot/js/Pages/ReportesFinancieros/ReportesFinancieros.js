// Reportes mensuales 
$(document).ready(function () {
    .ajax({
        url: 'https://simepciapii.azurewebsites.net/api/Factura/GetReportesFinancieros',
        method: 'GET',
        success: function (data) {
            poblarTabla(data);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener datos del API:', error);
        }
    });

    function poblarTabla(data) {
        var tbody = $('#tablaGanancias tbody');
        tbody.empty();

        data.forEach(function (gananciasMes) {
            var fila = $('<tr>');

            fila.append($('<td>').text(formatDate(gananciasMes.mes)));
            fila.append($('<td>').text(gananciasMes.gananciaCitas));
            fila.append($('<td>').text(gananciasMes.gananciaServicios));
            fila.append($('<td>').text(gananciasMes.gananciasTotales));

            tbody.append(fila);
        });
    }

    function formatDate(dateString) {
        var date = new Date(dateString);
        var options = { month: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }
});

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}
