/* var sede;

document.addEventListener("DOMContentLoaded", function () {

    var usuarioString = sessionStorage.getItem("sede");
    sede = JSON.parse(sedeString);

    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("descripcion").value = usuario.descripcion;
    document.getElementById("provincia").value = usuario.provincia;
    document.getElementById("canton").value = usuario.canton;
    document.getElementById("distrito").value = usuario.distrito;
    document.getElementById("fechaCreacion").value = usuario.fechaCreacion.split("T")[0];

    document.getElementById("foto_perfil_preview").src = usuario.foto;
    document.getElementById("foto_perfil_preview").style.display = "block";
});
// Mapa de Google Maps
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
}); */
$(document).ready(function () {

    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/Sede/GetAllSedes',
        method: 'GET',
        success: function (data) {

            poblarTabla(data);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener datos del API:', error);
        }
    });

    function poblarTabla(data) {
        var tbody = $('#tablaSedes tbody');
        tbody.empty();

        data.forEach(function (sede) {
            var fila = $('<tr>');

            fila.append($('<td>').text(sede.nombre));
            fila.append($('<td>').text(sede.descripcion));
            fila.append($('<td>').text(sede.fechaCreacion));

            var ubicacion = $('<a>')
                .attr('href', 'https://www.google.com/maps?q=' + sede.ubicacion)
                .attr('target', '_blank')
                .text('Ver Ubicación');

            fila.append($('<td>').append(ubicacion));

            fila.append($('<td>').text(sede.provincia));
            fila.append($('<td>').text(sede.canton));
            fila.append($('<td>').text(sede.distrito));

            var imagen = $('<a>')
                .attr('href', '#')
                .attr('name', sede.foto)
                .text('Ver imágen');
            fila.append($('<td>').append(imagen));


            var botonEditar = $('<button>').text('Editar').addClass('editar-btn');
            fila.append($('<td>').append(botonEditar));

            tbody.append(fila);
        });

        // Evento click para el botón de editar
        /*  $('#tablaSedes').on('click', '.editar-btn', function () {
  
              var fila = $(this).closest('tr');
  
              var datosFila = {
                  id: fila.find('td:eq(0)').text(),
                  nombre: fila.find('td:eq(1)').text(),
                  descripcion: fila.find('td:eq(2)').text(),
                  fechaCreacion: fila.find('td:eq(3)').text(),
                  ubicacion: fila.find('td:eq(4)').text(),
                  provincia: fila.find('td:eq(5)').text(),
                  canton: fila.find('td:eq(6)').text(),
                  distrito: fila.find('td:eq(7)').text(),
                  //foto: $('#url_imagen_cloudinary').val() || usuario.foto,
              };
  
              var datosFilaJSON = JSON.stringify(datosFila); 
  
              console.log('Datos de la fila:', datosFila);
  
              window.location.href = '../GestionInformacion/EditarSede?datos=' + encodeURIComponent(datosFilaJSON);
          }); */
    }
});
function obtenerDatosFilaDesdeURL() {
    var urlParams = new URLSearchParams(window.location.search);
    var sedesJSON = urlParams.get('sedes');
    var datosFila = JSON.parse(decodeURIComponent(facturaJSON));
    return datosFila;
}

/* function EditarSede() {
    this.InitView = function () {
        $('form').submit(function (event) {
            event.preventDefault();
            submitEditarUsuario();
        });
    }
    function submitEditarUsuario() {
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
            data: JSON.stringify(sede),
            hasContent: true
        }).done(function (result) {
            console.log("Sede actualizado correctamente.");
            console.log("Respuesta del servidor:", result);
            usuario = { ...usuario, ...sede };

            sessionStorage.setItem("sede", JSON.stringify(sede));

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
            ubicacion: $('#ubicacion').val() || sede.ubicacion,
            provincia: $('#provincia').val(),
            canton: $('#canton').val(),
            distrito: $('#distrito').val(),
            foto: $('#url_imagen_cloudinary').val() || usuario.foto,

        };

        return sedeObj;
    }
}

var view = new EditarSede();
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
} */
