function obtenerFechaActual() {
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var año = fecha.getFullYear();
    return año + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;
}

// Función para llenar los datos en el HTML
function llenarDatosFactura(datosFila) {


    $('#fecha').text(obtenerFechaActual());

    $('#numeroFactura').text(datosFila.idFactura);

   

    // Llenar la tabla de desglose de productos
    var desgloseProductos = $('#desgloseProductos');
    var productos1 = "Cita " + datosFila.especialidad;
    var precio1 = parseFloat(datosFila.precio);
    var precio2 = parseFloat(datosFila.precio2);

    // Agregar fila de productos 1
    var filaProducto1 = $('<tr>');
    filaProducto1.append('<td>' + productos1 + '</td>');
    filaProducto1.append('<td>' + precio1.toFixed(2) + '</td>');
    desgloseProductos.append(filaProducto1);

    // Agregar fila de productos 2 
    if (datosFila.servicios && datosFila.precio2) {
        var productos2 = datosFila.servicios;
        var filaProducto2 = $('<tr>');
        filaProducto2.append('<td>' + productos2 + '</td>');
        filaProducto2.append('<td>' + precio2.toFixed(2) + '</td>');
        desgloseProductos.append(filaProducto2);
    }

    // Calcular subtotal
    var subtotal = precio1 + precio2;
    $('#subtotal').text(subtotal.toFixed(2));

    //obtener los valores de impuesto y IVA
    function obtenerValoresImpuestos() {
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Configuracion/GetAllConfiguraciones',
            method: 'GET',
            success: function (data) {
                var impuesto = data.find(function (element) {
                    return element.nombre === 'Impuesto';
                });
                var iva = data.find(function (element) {
                    return element.nombre === 'IVA';
                });


                $('#impuestoSevicio').text(impuesto.valor + '%');
                $('#iva').text(iva.valor + '%');

                var impuestoValor = parseFloat(impuesto.valor);
                var ivaValor = parseFloat(iva.valor);
                var total = subtotal + (subtotal * impuestoValor / 100) + (subtotal * ivaValor / 100);
                $('#total').text(total.toFixed(2));
            },
            error: function (error) {
                console.error('Error al obtener valores de impuestos:', error);
            }
        });
    }


    obtenerValoresImpuestos();
}

// Datos de la URL
function obtenerDatosFilaDesdeURL() {

    var urlParams = new URLSearchParams(window.location.search);
    var datosFilaJSON = urlParams.get('datos');


    var datosFila = JSON.parse(decodeURIComponent(datosFilaJSON));

    return datosFila;
}


$(document).ready(function () {
    var datosFila = obtenerDatosFilaDesdeURL();
    llenarDatosFactura(datosFila);
});








