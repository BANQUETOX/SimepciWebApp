
$(document).ready(function () {
    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/TipoExamen/GetAllTiposExamenes',
        method: 'GET',
        success: function (data) {
            var select = $('#tipo');
            $.each(data, function (index, option) {
                select.append('<option value="' + option.id + '">' + option.nombre + '</option>');
            });
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener opciones del API:', error);
        }
    });

    $('#examenForm').submit(function (event) {
        event.preventDefault();
        guardarExamen();
    });

    function guardarExamen() {
        var examenData = {
            idTipoExamenMedico: parseInt($('#tipo').val()),
            correoUsuario: $('#correo').val(),
            resultado: '',
            objetivo: $('#justificacion').val(),
        };

        console.log('Datos del examen:', examenData);

        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/ExamenMedico/CrearExamenMedico',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(examenData),
            success: function (response) {
                console.log('Examen guardado exitosamente:', response);
               
                mostrarMensaje();
            },
            error: function (xhr, status, error) {
                console.error('Error al guardar el examen:', error);
            }
        });
    }

    function mostrarMensaje() {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Exámen registrado correctamente.',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                
                limpiarInputs();
            }
        });
    }

    function limpiarInputs() {
       
        $('#tipo').val('');
        $('#correo').val('');
        $('#justificacion').val('');
    }
});