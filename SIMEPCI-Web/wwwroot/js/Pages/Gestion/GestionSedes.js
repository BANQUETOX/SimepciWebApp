function inicializarMapa() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Código para inicializar el mapa y agregar marcadores...
        });
    } else {
        alert("Tu navegador no admite la geolocalización");
    }
}

// Llamar a initMap() después de cargar la API de Google Maps
document.addEventListener("DOMContentLoaded", function () {
    inicializarMapa();
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
});

// Función para abrir el widget de Cloudinary cuando el modal se muestra
$('#registroModal').on('shown.bs.modal', function () {
    document.getElementById("imagen").addEventListener("change", function (event) {
        var archivo = event.target.files[0];
        var cloudinaryWidget = cloudinary.createUploadWidget({
            cloudName: 'dddka6gqc',
            uploadPreset: 'ml_default'
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log('Imagen subida con éxito: ', result.info.secure_url);
            }
        });

        cloudinaryWidget.open();
    });
});