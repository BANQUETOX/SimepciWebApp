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
                title: "Ubicaci�n actual",
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
        alert("Tu navegador no admite la geolocalizaci�n");
    }
}

// Cloudinary

const cloudinaryWidget = cloudinary.createUploadWidget({
    cloudName: 'dddka6gqc',
    uploadPreset: 'ml_default'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        const imageUrl = result.info.secure_url;
        document.getElementById("url_imagen_cloudinary").value = imageUrl;
        const imgPreview = document.getElementById("foto_perfil_pr");
        imgPreview.src = imageUrl;
        imgPreview.style.display = "block";
    } else {
        console.error("Error al cargar la imagen:", error);
        if (error) {
            console.log("Detalles del error:", error.message);
        }
    }
});

$('#registroModal').on('shown.bs.modal', function () {
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
                title: "Ubicaci�n actual",
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
        alert("Tu navegador no admite la geolocalizaci�n");
    }
});

// Funci�n para abrir el widget de Cloudinary cuando el modal se muestra
$('#registroModal').on('shown.bs.modal', function () {
    document.getElementById("imagen").addEventListener("change", function (event) {
        var archivo = event.target.files[0];
        var cloudinaryWidget = cloudinary.createUploadWidget({
            cloudName: 'dddka6gqc',
            uploadPreset: 'ml_default'
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log('Imagen subida con �xito: ', result.info.secure_url);
            }
        });

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
                select.append('<option value="' + option.id + '">' + option.nombre + '</option>');
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
    $('#sedesForm').submit(function (event) {
        event.preventDefault();
        guardarExamen();
    });
    function obtenerDatos() {
        var sede = {
            nombre: $('#nombre').val(),
            descripcion: $('#descripcion').val(),
            fechaCreacion: new Date($('#fechaCreacion').val()).toISOString(),
            provincia: $('#provincia').val(),
            canton: $('#canton').val(),
            distrito: $('#distrito').val(),
            ubicacion: $('#ubicacion').val(),
            foto: $('#url_imagen_cloudinary').val(),
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