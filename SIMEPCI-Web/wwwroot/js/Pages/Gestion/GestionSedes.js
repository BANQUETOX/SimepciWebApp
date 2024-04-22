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

});

$('#btnCargarImagen').click(function () {
    cloudinaryWidget.open();
});

$('#sedesForm').submit(function (event) {
    event.preventDefault(); 
    obtenerDatos(); 
});

$('#btnConfirmar').click(function () {
    submitEditarSede();
});

// Editar o registrar sede
$('.container .row').on('click', '.btn-editar', function () {
    var btnEditar = $(this);
    if (btnEditar.hasClass('confirmar')) {
        submitEditarSede(btnEditar);
    } else {
        $('#btnConfirmar').show();
        $('#registroModal').modal('show');
    }
});

$('#registroModal').on('hidden.bs.modal', function () {
    $('#btnConfirmar').hide();
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
        data: JSON.stringify(sede),
        hasContent: true
    }).done(function (result) {
        console.log("Sede actualizado correctamente.");
        console.log("Respuesta del servidor:", result);

        // Actualizar campos de la tarjeta de la sede
        var sedeCard = btnEditar.closest('.card-body');
        sedeCard.find('.nombre').text(sede.nombre);
        sedeCard.find('.descripcion').text(sede.descripcion);
        sedeCard.find('.fechaCreacion').text(sede.fechaCreacion);
        sedeCard.find('.provincia').text(sede.provincia);
        sedeCard.find('.canton').text(sede.canton);
        sedeCard.find('.distrito').text(sede.distrito);
        sedeCard.find('.ubicacion').text(sede.ubicacion);

        // Cerrar modal y ocultar botón
        $('#registroModal').modal('hide');
        $('#btnConfirmar').hide();
        btnEditar.removeClass('editar');
    }).fail(function (xhr, textStatus, errorThrown) {
        console.error("Error al actualizar sede:", errorThrown);
    });

    // Función para obtener los datos de la sede
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
        };

        return sedeObj;
    }

    // Función para mostrar mensaje de éxito
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

    // Función para actualizar campos de la sede
    function actualizarCamposSede() {
        document.getElementById("nombre").value = sede.nombre;
        document.getElementById("descripcion").value = sede.descripcion;
        document.getElementById("fechaCreacion").value = sede.fechaCreacion.split("T")[0];
        document.getElementById("provincia").value = sede.provincia;
        document.getElementById("canton").value = sede.canton;
        document.getElementById("distrito").value = sede.distrito;
        document.getElementById("ubicacion").value = sede.ubicacion;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var sedeString = sessionStorage.getItem("id");
    sede = JSON.parse(sedeString);

    document.getElementById("nombre").value = sede.nombre;
    document.getElementById("descripcion").value = sede.descripcion;
    document.getElementById("fechaCreacion").value = sede.fechaCreacion.split("T")[0];
    document.getElementById("provincia").value = sede.provincia;
    document.getElementById("canton").value = sede.canton;
    document.getElementById("distrito").value = sede.distrito;
    document.getElementById("ubicacion").value = sede.ubicacion;
});

$(document).ready(function () {
    $('.container .row').on('click', '.btn-editar', function () {
        $('#btnConfirmar').show();
        $('#registroModal').modal('show');
    });
    $('#registroModal').on('hidden.bs.modal', function () {
        $('#btnConfirmar').hide();
    });
});    
    
