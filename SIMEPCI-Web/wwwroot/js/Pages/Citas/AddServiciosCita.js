$(document).ready(function () {
    $('#CitasForm').submit(function (event) {
        event.preventDefault();
        var correo = $('#correo').val();

        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Cita/GetCitasPaciente?correoPaciente=' + encodeURIComponent(correo),
            method: 'GET',
            success: function (data) {
                poblarTabla(data);
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener datos del API:', error);
            }
        });

        function poblarTabla(datos) {
            var tabla = $('#tablaCitas tbody');
            tabla.empty();
            datos.forEach(function (cita) {
                var fila = $('<tr>');
                fila.append($('<td>').text(formatDate(cita.fecha))); 
                fila.append($('<td>').text(cita.especialidad));
                fila.append($('<td>').text(cita.doctor));
                var boton = $('<button>').text('Añadir Servicio');
                boton.click(function () {
                    abrirModal(cita.id);
                });
                var accionesCell = $('<td>').append(boton);
                fila.append(accionesCell);
                tabla.append(fila);
            });

            function formatDate(dateString) {
                var date = new Date(dateString);
                var options = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                };
                return date.toLocaleDateString('es-ES', options);
            }
        }
    });

    function abrirModal(citaId) {
        $('#modalAgregarServicio').modal('show');
        $('#btnAgregarServicio').click(function () {
            var servicio = $('#inputServicio').val();
            var precio = parseFloat($('#inputPrecio').val()); 

           
            var servicioData = {
                nombre: servicio,
                precio: precio
            };
        
            var postData = {
                idCita: citaId,
                costosAdicionales: [servicioData] 
            };
           
            $.ajax({
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: "POST",
                url: 'https://simepciapii.azurewebsites.net/api/Factura/CrearFactura',
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data: JSON.stringify(postData),
                success: function (result) {
                    console.log("Servicio añadido correctamente.");
                   
                    $('#modalAgregarServicio').modal('hide');
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.error("Error al añadir servicio:", errorThrown);
                }
            });
        });
    }
});