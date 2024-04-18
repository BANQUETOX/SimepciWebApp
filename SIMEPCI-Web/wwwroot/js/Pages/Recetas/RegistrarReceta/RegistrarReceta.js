
$(document).ready(function () {
    
    $('#examenForm').submit(function (event) {
        event.preventDefault(); 

        
    });

    var cloudinaryWidget = cloudinary.createUploadWidget({
        cloudName: 'dddka6gqc',
        uploadPreset: 'ml_default',
        sources: ['local', 'url', 'camera', 'facebook', 'instagram'],
        multiple: false,
        cropping: false,
    }, function (error, result) {
        if (!error && result && result.event === "success") {
            
            $('#recetaFisica').val(result.info.secure_url);
        } else {
            console.error("Error al cargar la imagen:", error);
            if (error) {
                console.log("Detalles del error:", error.message);
            }
        }
    });

    
    $('#btnCargarImagen').click(function () {
        cloudinaryWidget.open();
    });

    
    $('#btnRegistrar').click(function () {
        
        var correo = $('#correo').val();
        var medicamento = $('#txtNombreMedicamento').val() || '';
        var dosis = $('#txtDosis').val() || '';
        var duracionTratamiento = $('#txtDuracionTratamiento').val() || '';
        var recomendaciones = $('#txtRecomendacionesAdicionales').val() || '';
        var recetaFisica = $('#recetaFisica').val() || '';

        
        var data = {
            correoPaciente: correo,
            medicamento: medicamento,
            dosis: dosis,
            diasDosis: duracionTratamiento,
            recomendaciones: recomendaciones,
            imagen: recetaFisica
        };

        console.log(data);
        
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Receta/CreateReceta',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                console.log('Respuesta del API:', response);
                
                mostrarMensaje();
            },
            error: function (xhr, status, error) {
                console.error('Error al enviar los datos al API:', error);
                alert('Error al registrar. Por favor, inténtelo de nuevo más tarde.');
            }
        });
    });

    function mostrarMensaje() {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Receta registrada correctamente.',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {

                limpiarInputs();
            }
        });
    }

    function limpiarInputs() {

        $('#correo').val('');
        $('#txtNombreMedicamento').val('');
        $('#txtDosis').val('');
        $('#txtDuracionTratamiento').val('');
        $('#txtRecomendacionesAdicionales').val('');
        $('#recetaFisica').val('');
    }
});
