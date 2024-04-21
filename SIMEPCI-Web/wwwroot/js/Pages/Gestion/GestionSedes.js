/// Mapa de Google Maps
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const latLng = new google.maps.LatLng(lat, lng);

            const mapOptions = {
                center: latLng,
                zoom: 12
            };

            const map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
            const marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Ubicación actual",
                draggable: true
            });

            google.maps.event.addListener(marker, "dragend", function (event) {

                const newLat = event.latLng.lat();
                const newLng = event.latLng.lng();
                console.log("Nuevas coordenadas:", newLat, newLng);
                document.getElementById("ubicacion").value = newLat + "," + newLng;
            });
        });
    } else {
        alert("Tu navegador no admite la geolocalización");
    }
}

// Cloudinary
$(document).ready(function () {
   
    var cloudinaryWidget = cloudinary.createUploadWidget({
        cloudName: 'dddka6gqc',
        uploadPreset: 'ml_default',
        sources: ['local', 'url', 'camera', 'facebook', 'instagram'],
        multiple: false,
        cropping: false,
    }, function (error, result) {
        if (!error && result && result.event === "success") {

            $('#registroSedes').val(result.info.secure_url);

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

    var sedeId = null;

    $('.container .row').on('click', '.btn-editar', function () {
        var sedeCard = $(this).closest('.card-body');
        var sede = {
            nombre: sedeCard.find('.nombre').text(),
            descripcion: sedeCard.find('.descripcion').text(),
            fechaCreacion: sedeCard.find('.fechaCreacion').text(),
            provincia: sedeCard.find('.provincia').text(),
            canton: sedeCard.find('.canton').text(),
            distrito: sedeCard.find('.distrito').text(),
            ubicacion: sedeCard.find('.ubicacion').text(),
        };

        //var sedeId = $(this).data('id');

        $('#nombre').val(sede.nombre);
        $('#descripcion').val(sede.descripcion);
        $('#fechaCreacion').val(sede.fechaCreacion);
        $('#provincia').val(sede.provincia);
        $('#canton').val(sede.canton);
        $('#distrito').val(sede.distrito);
        $('#ubicacion').val(sede.ubicacion);

        $('#registroModal').modal('show');
    });
    
    $('#sedesForm').submit(function (event) {
        event.preventDefault(); 

       // var sedeId = $(this).data('id');

        if (sedeId) {
            editarSede(sedeId); 
        } else {
            obtenerDatos(); 
        }

        //obtenerDatos(); 
    });

    
    //registrar sede
    function obtenerDatos() {
        var sede = {
            nombre: $('#nombre').val(),
            descripcion: $('#descripcion').val(),
            fechaCreacion: new Date($('#fechaCreacion').val()).toISOString(),
            provincia: $('#provincia').val(),
            canton: $('#canton').val(),
            distrito: $('#distrito').val(),
            ubicacion: $('#ubicacion').val(),
            foto: $('#registroSedes').val(),
        };


        $.ajax({
            type: 'POST',
            url: 'https://simepciapii.azurewebsites.net/api/Sede/CrearSede',
            data: JSON.stringify(sede),
            contentType: 'application/json',
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    text: 'La sede se ha registrado correctamente.'
                });

                console.log('Registro exitoso:', response);


                // Agregar la nueva tarjeta de sede al DOM
                agregarTarjetaSede(sede);
            },
            error: function (xhr, status, error) {
                if (error) {
                    console.error('Error al registrar la sede:', error);
                } else {
                    console.error('Error al registrar la sede: Error no definido');
                }
            }
        });
    }

    // Función para editar una sede
    function editarSede(sedeId) {
        var sede = {
            id: sedeId,
            nombre: $('#nombre').val(),
            descripcion: $('#descripcion').val(),
            fechaCreacion: $('#fechaCreacion').val(),
            provincia: $('#provincia').val(),
            canton: $('#canton').val(),
            distrito: $('#distrito').val(),
            ubicacion: $('#ubicacion').val(),
            foto: $('#registroSedes').val(),
        };

        $.ajax({
            type: 'PUT',
            url: 'https://simepciapii.azurewebsites.net/api/Sede/ActualizarSede',
            data: JSON.stringify(sede),
            contentType: 'application/json',
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Edición exitosa!',
                    text: 'La sede se ha actualizado correctamente.'
                });

                console.log('Edición exitosa:', response);

            },
            error: function (xhr, status, error) {
                if (error) {
                    console.error('Error al editar la sede:', error);
                } else {
                    console.error('Error al editar la sede: Error no definido');
                }
            }
        });
    }

    function agregarTarjetaSede(sede) {
        var nuevaSedeHTML = `
    <div class="col-md-6">
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">Información de la Sede Registrada</h5>
                <p class="card-text">
                    <strong>Nombre:</strong> ${sede.nombre}<br>
                    <strong>Descripción:</strong> ${sede.descripcion}<br>
                    <strong>Fecha de Creación:</strong> ${sede.fechaCreacion}<br>
                    <strong>Provincia:</strong> ${sede.provincia}<br>
                    <strong>Cantón:</strong> ${sede.canton}<br>
                    <strong>Distrito:</strong> ${sede.distrito}<br>
                    <strong>Ubicación:</strong> ${sede.ubicacion}<br>
                </p>
                <button type="button" class="btn btn-primary mx-2 b-color1 btn-editar">Editar</button>
            </div>
        </div>
    </div>
`;

        $('.container .row').append(nuevaSedeHTML);
    }

});


$('.container .row').on('click', '.btn-editar', function () {
    $('#registroModal').modal('show');
});