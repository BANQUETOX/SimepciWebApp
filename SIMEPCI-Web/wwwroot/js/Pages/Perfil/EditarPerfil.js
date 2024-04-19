var usuario;

document.addEventListener("DOMContentLoaded", function () {
    
    var usuarioString = sessionStorage.getItem("usuario");
    usuario = JSON.parse(usuarioString);

    document.getElementById("identificacion").value = usuario.cedula;
    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("apellido1").value = usuario.primerApellido;
    document.getElementById("apellido2").value = usuario.segundoApellido;
    document.getElementById("telefono").value = usuario.telefono;
    document.getElementById("correo").value = usuario.correo;
    document.getElementById(`sexo_${usuario.sexo}`).checked = true;
    document.getElementById("fecha_nacimiento").value = usuario.fechaNacimiento.split("T")[0];
    document.getElementById("edad").value = usuario.edad;

    //document.getElementById("foto_perfil_preview").value = usuario.fotoPerfil;
    document.getElementById("foto_perfil_preview").src = usuario.fotoPerfil;
    document.getElementById("foto_perfil_preview").style.display = "block";

    document.getElementById("identificacion").disabled = true;
    document.getElementById("fecha_nacimiento").disabled = true;
    document.getElementById("edad").disabled = true;
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




function EditarUsuario() {
    this.InitView = function () {
        $('form').submit(function (event) {
            event.preventDefault();
            submitEditarUsuario(); 
        });
    }

    function submitEditarUsuario() {
        var user = obtenerDatosUsuario();
        const API_URL_BASE = "https://simepciapii.azurewebsites.net/";
        var api_url = API_URL_BASE + "api/Usuario/UpdateUsuario";

        console.log(user);

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
            console.log("Usuario actualizado correctamente.");
            console.log("Respuesta del servidor:", result);
            usuario = { ...usuario, ...user };

            
            sessionStorage.setItem("usuario", JSON.stringify(usuario));

            actualizarCamposUsuario();
            mostrarMensaje();

        }).fail(function (xhr, textStatus, errorThrown) {
            console.error("Error al actualizar usuario:", errorThrown);
        });
    }

    function obtenerDatosUsuario() {
        var user = {
            idUsuario: usuario.id,
            nombre: $('#nombre').val(),
            primerApellido: $('#apellido1').val(),
            segundoApellido: $('#apellido2').val(),
            cedula: $('#identificacion').val(),
            fechaNacimiento: new Date($('#fecha_nacimiento').val()).toISOString(),
            telefono: $('#telefono').val(),
            correo: $('#correo').val(),
            direccion: $('#ubicacion').val() || usuario.direccion,
            fotoPerfil: $('#url_imagen_cloudinary').val() || usuario.fotoPerfil,
            sexo: $("input[name='sexo']:checked").val()
        };

        return user; 
    }
}

var view = new EditarUsuario();
view.InitView();

function mostrarMensaje() {
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Perfil actualizado correctamente.',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload();
        }
    });
}

function actualizarCamposUsuario() {
    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("apellido1").value = usuario.primerApellido;
    document.getElementById("apellido2").value = usuario.segundoApellido;
    document.getElementById("telefono").value = usuario.telefono;
    document.getElementById("correo").value = usuario.correo;
    document.getElementById(`sexo_${usuario.sexo}`).checked = true;
    document.getElementById("fecha_nacimiento").value = usuario.fechaNacimiento.split("T")[0];
    document.getElementById("edad").value = usuario.edad;
    document.getElementById("foto_perfil_preview").src = usuario.fotoPerfil;
}