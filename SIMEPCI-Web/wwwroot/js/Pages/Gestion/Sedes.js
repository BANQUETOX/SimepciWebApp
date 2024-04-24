﻿$(document).ready(function () {

    var sedesData; 

    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/Sede/GetAllSedes',
        method: 'GET',
        success: function (data) {
            sedesData = data; 
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
                .attr('href', sede.foto) 
                .attr('target', '_blank') 
                .text('Ver imagen');
            fila.append($('<td>').append(imagen));

            var botonEditar = $('<button>').text('Editar').addClass('editar-btn');
            fila.append($('<td>').append(botonEditar));

            tbody.append(fila);
        });

        
        $('#tablaSedes').on('click', '.editar-btn', function () {
            var fila = $(this).closest('tr'); 
            var index = fila.index(); 

            var sede = sedesData[index]; 

            
            var json = {
                nombre: fila.find('td:eq(0)').text(),
                descripcion: fila.find('td:eq(1)').text(),
                fechaCreacion: fila.find('td:eq(2)').text(),
                ubicacion: sede.ubicacion, 
                provincia: fila.find('td:eq(4)').text(),
                canton: fila.find('td:eq(5)').text(),
                distrito: fila.find('td:eq(6)').text(),
                id: sede.id, 
                foto: sede.foto 
                
            };

            
            window.location.href = '../GestionInformacion/EditarSede?data=' + JSON.stringify(json);
        });
    }
});