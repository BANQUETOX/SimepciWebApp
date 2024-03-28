function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

document.getElementById("fecha_nacimiento").addEventListener("change", function () {
    const fechaNacimiento = this.value;
    const edad = calcularEdad(fechaNacimiento);
    document.getElementById("edad").value = edad;
});

// Mapa de Google Maps
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // coordenadas de latitud y longitud
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
const cloudinaryWidget = cloudinary.createUploadWidget({
    cloudName: 'dddka6gqc',
    uploadPreset: 'ml_default'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Imagen subida', result.info.secure_url);
     
    }
});

document.getElementById("foto_perfil").addEventListener("click", function () {
    cloudinaryWidget.open();
});


//foto de perfil

document.getElementById("foto_perfil_container").addEventListener("click", function () {
    document.getElementById("foto_perfil").click();
});

document.getElementById("foto_perfil").addEventListener("change", function () {
    const file = this.files[0]; 
    if (file) {
        const reader = new FileReader();  
        reader.onload = function (event) {
            
            const imageUrl = event.target.result;

            document.getElementById("foto_perfil_preview").src = imageUrl;
            document.getElementById("foto_perfil_preview").style.display = "block";
            document.getElementById("foto_icono").style.display = "none";
        };
        reader.readAsDataURL(file);
    }
});
