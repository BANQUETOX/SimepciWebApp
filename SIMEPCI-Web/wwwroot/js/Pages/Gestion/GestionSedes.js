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
    $('#sedesForm').submit(function (event) {
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
});

//registrar sede
$(document).ready(function () {
    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/Sede/GetAllSedes',
        method: 'GET',
        success: function (data) {
            var select = $('#tipo');
            $.each(data, function (index, option) {
                select.append('<option value="' + option.nombre + '">' + '</option>');
            });
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener opciones del API:', error);
        }
    });

    function RegistrarSede() {
        this.InitView = function () {
            $('#registroModal form').submit(function (event) {
                event.preventDefault();
                obtenerDatos();
            });
        }
    }

    //submit
    /* $('#sedesForm').submit(function (event) {
        event.preventDefault();
        guardarExamen();
    }); */  

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
            success: function (response) {

                console.log('Registro exitoso:', response);

            },
            error: function (xhr, status, error) {

                console.error('Error al registrar la sede:', error);

            }
        });
    }
});

var registrarSede = new RegistrarSede();
registrarSede.InitView();
