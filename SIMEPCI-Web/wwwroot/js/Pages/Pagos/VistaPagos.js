var usuarioString = sessionStorage.getItem("usuario");
var usuario = JSON.parse(usuarioString);
var correo = usuario.correo;

$(document).ready(function () {
    
    obtenerIdCitas(correo);
    
});


///crear factura

function obtenerIdCitas(correo) {
        
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Cita/GetCitasPaciente?correoPaciente=' + encodeURIComponent(correo), 
            method: 'GET',

            success: function (response) {
                
                var listaIdCitas = response.map(function (cita) {
                    return cita.id;
                });
                
                obtenerIdCitasFactura(correo, listaIdCitas);
            },
            error: function (error) {
                console.error('Error al obtener citas del primer API:', error);
            }
        });
    }


function obtenerIdCitasFactura(correo, listaIdCitas) {
        
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Factura/GetFacturasPaciente?correoPaciente=' + encodeURIComponent(correo),
            method: 'GET',

            success: function (response) {
               
                var listaIdCitasFactura = response.map(function (factura) {
                    return factura.idCita;
                });
                
                compararIdCitas(listaIdCitas, listaIdCitasFactura);
            },
            error: function (error) {
                console.error('Error al obtener citas de factura del segundo API:', error);
            }
        });
    }


function compararIdCitas(listaIdCitas, listaIdCitasFactura) {
        
        var idCitasFaltantes = listaIdCitas.filter(function (idCita) {
            return !listaIdCitasFactura.includes(idCita);
        });

        
        if (idCitasFaltantes.length > 0) {
            idCitasFaltantes.forEach(function (idCita) {
                crearFactura(idCita);
            });
        } else {
            console.log('No hay citas faltantes en las facturas.');
            popularTabla(correo);
        }
    }


function crearFactura(idCita) {
        
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Factura/CrearFactura',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                idCita: idCita,
                costosAdicionales: []
            }),
            success: function (response) {
                console.log('API Tercero llamado exitosamente para la cita faltante:', idCita);
                popularTabla(correo);
            },
            error: function (error) {
                console.error('Error al llamar al tercer API para la cita faltante:', idCita, error);
            }
        });
    }



function popularTabla(correo) {
    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/Cita/GetCitasPaciente?correoPaciente=' + encodeURIComponent(correo),
        method: 'GET',
        success: function (data) {

            var citasProcesadas = 0;

            data.forEach(function (cita) {

                $.ajax({
                    url: 'https://simepciapii.azurewebsites.net/api/Factura/GetFacturasPaciente?correoPaciente=' + encodeURIComponent(correo),
                    method: 'GET',
                    success: function (facturas) {

                        var factura = facturas.find(function (factura) {
                            return factura.idCita === cita.id;
                        });

                        var totalMonto = 0;

                        if (factura && factura.costosAdicionales.length > 0) {
                            totalMonto = factura.costosAdicionales.reduce(function (total, costo) {
                                return total + costo.precio;
                            }, 0);
                        }

                        
                        var newRow = $('<tr>');
                        newRow.append('<td>' + cita.id + '</td>');

                        var fecha = new Date(cita.fecha);
                        var fechaFormateada = fecha.toLocaleDateString();
                        newRow.append('<td>' + fechaFormateada + '</td>');

                        newRow.append('<td>' + cita.especialidad + '</td>');
                        newRow.append('<td>' + cita.precio + '</td>');

                       
                        var costosAdicionales = factura ? factura.costosAdicionales : [];
                        var nombresCostos = costosAdicionales.map(function (costo) {
                            return costo.nombre;
                        });
                        newRow.append('<td>' + nombresCostos.join(', ') + '</td>'); 
                        newRow.append('<td>' + totalMonto + '</td>');
                        newRow.append('<td>' + (factura ? factura.monto : 0) + '</td>');
                        newRow.append('<td>' + (factura ? factura.id : '') + '</td>');
                       

                        
                        if (factura && !factura.pagada) {
                            newRow.append('<td><button class="pagar-btn" data-cita-id="' + cita.id + '">Pagar</button></td>');
                        } else {
                            newRow.append('<td>Monto Cancelado</td>');
                        }
                        $('#tablaRecetas tbody').append(newRow);
                    },
                    error: function (error) {
                        console.error('Error al obtener facturas:', error);
                    },
                    complete: function () {
                        citasProcesadas++;
                        if (citasProcesadas === data.length) {
                            console.log('Todas las citas procesadas.');
                        }
                    }
                });
            });
        },
        error: function (error) {
            console.error('Error al obtener citas médicas:', error);
        }
    });

    
    $('#tablaRecetas').on('click', '.pagar-btn', function () {
        
        var fila = $(this).closest('tr');

        var datosFila = {
            id: fila.find('td:eq(0)').text(), 
            fecha: fila.find('td:eq(1)').text(), 
            especialidad: fila.find('td:eq(2)').text(), 
            precio: fila.find('td:eq(3)').text(), 
            servicios: fila.find('td:eq(4)').text(), 
            precio2: fila.find('td:eq(5)').text(), 
            montoFactura: fila.find('td:eq(6)').text(), 
            idFactura: fila.find('td:eq(7)').text()
            
        };

       
        var datosFilaJSON = JSON.stringify(datosFila);

        
        console.log('Datos de la fila:', datosFila);

        
        window.location.href = '../Pagos/Paypal?datos=' + encodeURIComponent(datosFilaJSON);
    });

}
