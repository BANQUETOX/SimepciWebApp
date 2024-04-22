document.addEventListener('DOMContentLoaded', function () {
    var editarBotones = document.querySelectorAll('.editar');
    editarBotones.forEach(function (boton) {
        boton.addEventListener('click', function () {
            var reporteCard = boton.closest('.reporte-card');
            var fecha = reporteCard.querySelector('.fecha').textContent;
            var cedulaCliente = reporteCard.querySelector('.cedula-cliente').textContent;
            var sede = reporteCard.querySelector('.sede').textContent;
            var doctor = reporteCard.querySelector('.doctor').textContent;
            var costoCita = reporteCard.querySelector('.costo-cita').textContent;

            console.log('Editar reporte financiero:');
            console.log('Fecha:', fecha);
            console.log('Cédula del cliente:', cedulaCliente);
            console.log('Sede:', sede);
            console.log('Doctor:', doctor);
            console.log('Costo de cita:', costoCita);
        });
    });
});

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
