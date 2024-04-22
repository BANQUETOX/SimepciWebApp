var sede;
document.addEventListener("DOMContentLoaded", function () {

    var sedeString = sessionStorage.getItem("id");
    usuario = JSON.parse(sedeString);

    document.getElementById("nombre").value = sede.nombre;
    document.getElementById("descripcion").value = sede.descripcion;
    document.getElementById("fechaCreacion").value = sede.fechaCreacion.split("T")[0];
    document.getElementById("provincia").value = sede.provincia;
    document.getElementById("canton").value = sede.canton;
    document.getElementById("distrito").value = sede.distrito;
    document.getElementById("ubicacion").value = sede.ubicacion;
    

    //document.getElementById("foto_perfil_preview").value = usuario.fotoPerfil;
    /*document.getElementById("foto_perfil_preview").src = usuario.fotoPerfil;
    document.getElementById("foto_perfil_preview").style.display = "block";

    document.getElementById("identificacion").disabled = true;
    document.getElementById("fecha_nacimiento").disabled = true;
    document.getElementById("edad").disabled = true;*/
});

// Mapa de Google Maps
function initMap() {
    var usuarioString = sessionStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioString);


    var coordenadas = usuario.direccion.split(",");
    var latLngUsuario = new google.maps.LatLng(parseFloat(coordenadas[0]), parseFloat(coordenadas[1]));

    const mapOptions = {
        center: latLngUsuario,
        zoom: 12
    };

    const map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
    const marker = new google.maps.Marker({
        position: latLngUsuario,
        map: map,
        title: "Ubicación actual del usuario"
    });


    marker.setDraggable(true);

    google.maps.event.addListener(marker, "dragend", function (event) {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        console.log("Nuevas coordenadas:", newLat, newLng);
        document.getElementById("ubicacion").value = newLat + "," + newLng;
    });
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

//OJO CON ESTO:
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

function EditarSede() {
    this.InitView = function () {
        $('sedesForm').submit(function (event) {
            event.preventDefault();
            submitEditarSede();
        });
    }

    function submitEditarSede() {
        var sede = obtenerDatosSede();
        const API_URL_BASE = "https://simepciapii.azurewebsites.net/";
        var api_url = API_URL_BASE + "api/Sede/ActualizarSede";

        console.log(sede);

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "PATCH",
            url: api_url,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(user),
            hasContent: true
        }).done(function (result) {
            console.log("Sede actualizado correctamente.");
            console.log("Respuesta del servidor:", result);
            id = { ...id, ...sede };


            sessionStorage.setItem("id", JSON.stringify(id));

            actualizarCamposSede();
            mostrarMensaje();

        }).fail(function (xhr, textStatus, errorThrown) {
            console.error("Error al actualizar sede:", errorThrown);
        });
    }
    function obtenerDatosSede() {
        var sedeObj = {
            id: sede.id,
            nombre: $('#nombre').val(),
            descripcion: $('#descripcion').val(),
            fechaCreacion: new Date($('#fechaCreacion').val()).toISOString(),
            ubicacion: $('#ubicacion').val(),
            provincia: $('#provincia').val(),
            canton: $('#canton').val(),
            distrito: $('#distrito').val() 
            //fotoPerfil: $('#url_imagen_cloudinary').val() || usuario.fotoPerfil,
        };

        return sedeObj;
    }
}

var view = new submitEditarSede();
view.InitView();

function mostrarMensaje() {
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Sede actualizada correctamente.',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload();
        }
    });
}

function actualizarCamposSede() {
    document.getElementById("nombre").value = sede.nombre;
    document.getElementById("descripcion").value = sede.descripcion;
    document.getElementById("fechaCreacion").value = sede.fechaCreacion.split("T")[0];
    document.getElementById("provincia").value = sede.provincia;
    document.getElementById("canton").value = sede.canton;
    document.getElementById("distrito").value = sede.distrito;
    document.getElementById("ubicacion").value = sede.ubicacion;
}

