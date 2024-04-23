$(document).ready(function () {
    var usuarioString = sessionStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioString);
    var correo = usuario.correo;
    //var correo = "carorodriguez5@hotmail.com";

    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/Receta/GetRecetasPaciente?correoPaciente=' + encodeURIComponent(correo),
        method: 'GET',
        success: function (data) {
            poblarTabla(data);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener datos del API:', error);
        }
    });

    function poblarTabla(data) {
        var tbody = $('#tablaRecetas tbody');
        tbody.empty();

        data.forEach(function (receta) {
            var fila = $('<tr>');

            fila.append($('<td>').text(receta.nombreMedico));
            fila.append($('<td>').text(receta.clinica));
            fila.append($('<td>').text(formatDate(receta.fechaEmision))); 
            fila.append($('<td>').text(receta.medicamento));
            fila.append($('<td>').text(receta.dosis));
            fila.append($('<td>').text(receta.diasDosis));
            fila.append($('<td>').text(receta.recomendaciones));

            var recetaEnlace = $('<a>')
                .attr('href', '#')
                .attr('name', receta.imagen)
                .text('Ver receta');
            fila.append($('<td>').append(recetaEnlace));

            tbody.append(fila);
        });
    }

    function formatDate(dateString) {
        var date = new Date(dateString);
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' }; 
        return date.toLocaleDateString('es-ES', options);
    }
});

