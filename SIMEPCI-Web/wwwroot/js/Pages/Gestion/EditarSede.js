$(document).ready(function () {
    
    var urlParams = new URLSearchParams(window.location.search);
    var jsonDataString = urlParams.get('data');
    console.log(jsonDataString);

    if (jsonDataString) {
        
        var jsonData = JSON.parse(jsonDataString);

        
        $('#nombre').val(jsonData.nombre);
        $('#descripcion').val(jsonData.descripcion);
        $('#provincia').val(jsonData.provincia);
        $('#canton').val(jsonData.canton);
        $('#distrito').val(jsonData.distrito);
        $('#fechaCreacion').val(jsonData.fechaCreacion);
        $('#ubicacion').val(jsonData.ubicacion);

        
        if (jsonData.foto) {
            $('#foto_perfil_preview').attr('src', jsonData.foto);
        }
    }

    
    $('#form').submit(function (event) {
        
        event.preventDefault();

        
        var nombre = $('#nombre').val();
        var descripcion = $('#descripcion').val();
        var provincia = $('#provincia').val();
        var canton = $('#canton').val();
        var distrito = $('#distrito').val();
        var fechaCreacion = $('#fechaCreacion').val();
        var ubicacion = $('#ubicacion').val();
        var foto = $('#foto_perfil_preview').attr('src'); 

        
        var data = {
            id: jsonData.id,
            nombre: nombre,
            descripcion: descripcion,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            fechaCreacion: fechaCreacion,
            ubicacion: ubicacion || jsonData.ubicacion ,
            foto: foto || jsonData.foto
        };

       
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Sede/ActualizarSede', 
            method: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                console.log('Datos enviados exitosamente:', response);
                Swal.fire({
                    icon: 'success',
                    title: 'Información actualizada',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    window.location.href = '../GestionInformacion/Sedes';
                });
            },
            error: function (xhr, status, error) {
                console.error('Error al enviar datos al servidor:', error);
            }
        });
    });
});



// Mapa de Google Maps

function initMap() {
    var jsonDataString = new URLSearchParams(window.location.search).get('data');

    if (jsonDataString) {
        var jsonData = JSON.parse(jsonDataString);
        var ubicacion = jsonData.ubicacion.trim().split(",").map(parseFloat); 

        if (ubicacion.length === 2) {
            const mapOptions = {
                center: { lat: ubicacion[0], lng: ubicacion[1] }, 
                zoom: 12
            };

            const map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
            const marker = new google.maps.Marker({
                position: { lat: ubicacion[0], lng: ubicacion[1] }, 
                map: map,
                title: "Ubicación guardada"
            });

            marker.setDraggable(true);

            google.maps.event.addListener(marker, "dragend", function (event) {
                const newLat = event.latLng.lat();
                const newLng = event.latLng.lng();
                console.log("Nuevas coordenadas:", newLat, newLng);
                document.getElementById("ubicacion").value = newLat + "," + newLng;
            });
        } else {
            console.error("Formato de ubicación no válido:", jsonData.ubicacion);
        }
    }
}


//cloudinary
const cloudinaryWidget = cloudinary.createUploadWidget({
    cloudName: 'dddka6gqc',
    uploadPreset: 'ml_default'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        const imageUrl = result.info.secure_url;
        document.getElementById("url_imagen_cloudinary").value = imageUrl;
        const imgPreview = document.getElementById("foto_perfil_preview");
        imgPreview.src = imageUrl;
        imgPreview.style.display = "block";
    } else {
        console.error("Error al cargar la imagen:", error);
        if (error) {
            console.log("Detalles del error:", error.message);
        }
    }
});


document.getElementById("foto_perfil_container").addEventListener("click", function (event) {
    event.preventDefault();
    cloudinaryWidget.open();
});

document.getElementById("foto_perfil").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;
            document.getElementById("foto_perfil_preview").src = imageUrl;
            document.getElementById("foto_perfil_preview").style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});



