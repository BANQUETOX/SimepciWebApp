$(document).ready(function () {
    cargarDatos();
});

function cargarDatos() {
    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/Factura/GetReportesFinancieros',
        method: 'GET',
        success: function (data) {
            poblarTabla(data);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener datos del API:', error);
        }
    });
}

function poblarTabla(data) {
    var tbody = $('#tablaGanancias tbody');
    tbody.empty();

    data.forEach(function (gananciasMes) {
        var fila = $('<tr>');
        fila.append($('<td>').text(gananciasMes.mes));
        fila.append($('<td>').text(gananciasMes.gananciaCitas));
        fila.append($('<td>').text(gananciasMes.gananciaServicios));
        fila.append($('<td>').text(gananciasMes.gananciasTotales));
        tbody.append(fila);
    });
}

function descargarPDF() {
    var doc = new window.jspdf.jsPDF();
    doc.text('Reportes Mensuales', 10, 10);

    var tabla = document.getElementById('tablaGanancias');
    var filas = tabla.querySelectorAll('tr');

    var datos = [];
    filas.forEach(function (fila) {
        var rowData = [];
        var celdas = fila.querySelectorAll('td, th');
        celdas.forEach(function (celda) {
            rowData.push(celda.textContent);
        });
        datos.push(rowData);
    });

    doc.autoTable({
        head: [datos[0]],
        body: datos.slice(1),
        startY: 20
    });

    doc.save('reportes_mensuales.pdf');
}