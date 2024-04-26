
$(document).ready(function () {
    $('#examenForm').submit(function (event) {
        event.preventDefault();
        var correo = $('#correo').val(); 

        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/ExamenMedico/GetExamenesMedicosByCorreoPaciente?correoPaciente=' + encodeURIComponent(correo), 
            method: 'GET',
            success: function (data) {
                poblarTabla(data);
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener datos del API:', error);
            }
        });

        function poblarTabla(datos) {
            var tabla = $('#tablaExamenes tbody');
            tabla.empty();

            $.each(datos, function (index, examen) {
                var fila = $('<tr>');
                fila.append('<td>' + examen.nombreTipoExamenMedico + '</td>');
                fila.append('<td>' + examen.objetivo + '</td>');

                var resultadoCell = $('<td>');
                var accionesCell = $('<td>');

                if (examen.resultado === "") {
                    resultadoCell.text('Resultado pendiente');
                    var boton = $('<button>').text('Añadir resultado');
                    boton.click(function () {
                        var id = parseInt(examen.id);
                        const cloudinaryWidget = cloudinary.createUploadWidget({
                            cloudName: 'dddka6gqc',
                            uploadPreset: 'ml_default',
                            sources: ['local', 'url', 'camera', 'facebook', 'instagram'],
                            multiple: false,
                            cropping: false,
                        }, (error, result) => {
                            if (!error && result && result.event === "success") {
                                console.log('Archivo cargado a Cloudinary:', result.info.secure_url);

                                subirResultado(result.info.secure_url, id);

                            } else {
                                console.error("Error al cargar la imagen:", error);
                                if (error) {
                                    console.log("Detalles del error:", error.message);
                                }
                            }
                        });

                        cloudinaryWidget.open();
                    });
                    accionesCell.append(boton);
                } else {
                    var resultadoEnlace = $('<a>')
                        .attr('href', examen.resultado)
                        .attr('target', '_blank')
                        .text("Ver Resultados");
                    resultadoCell.append(resultadoEnlace);
                    accionesCell.text('Examen completado');
                }

                fila.append(resultadoCell);
                fila.append(accionesCell);
                tabla.append(fila);
            });
        }
    }); 

    function subirResultado(archivo, idExamen) {
        var urlArchivo = encodeURIComponent(archivo.toString());

        var apiUrl = 'https://simepciapii.azurewebsites.net/api/ExamenMedico/SubirResultado';
        var queryString = '?resultado=' + urlArchivo + '&idExamenMedico=' + idExamen;
        var urlCompleta = apiUrl + queryString;


        $.ajax({
            url: urlCompleta,
            method: 'PATCH',
            success: function (response) {
                console.log('Archivo cargado y URL enviado al API con éxito:', response);
                mostrarMensaje();
            },
            error: function (xhr, status, error) {
                console.error('Error al enviar URL del archivo al API:', error);
            }
        });
    }


    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    function mostrarMensaje() {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Resultado registrado correctamente.',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                
                $('#examenForm').submit();
            }
        });
    }
}); 