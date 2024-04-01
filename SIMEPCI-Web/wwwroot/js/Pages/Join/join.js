
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
       
        const imageUrl = result.info.secure_url;

        
        document.getElementById("foto_perfil").src = imageUrl;

        document.getElementById("foto_perfil_preview").src = imageUrl;
        document.getElementById("foto_perfil_preview").style.display = "block";
        document.getElementById("foto_icono").style.display = "none";
    }
});

document.getElementById("foto_perfil").addEventListener("click", function () {
    cloudinaryWidget.open();
});

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




//crear usuario

/*function CrearUsuario() {
    this.InitView = function () {
        $('form').submit(function (event) {
            event.preventDefault();
            var view = new CrearUsuario();
            view.SubmitCrearUsuario();
        });
    }

    this.SubmitCrearUsuario = function () {

        var usuario = {};
        //usuario.id = 0;
        usuario.nombre = $('#nombre').val();
        usuario.primerApellido = $('#apellido1').val();
        usuario.segundoApellido = $('#apellido2').val();
        usuario.cedula = $('#identificacion').val();
        var fechaNacimientoISO8601 = new Date($('#fecha_nacimiento').val()).toISOString();
        usuario.fechaNacimiento = fechaNacimientoISO8601;
        //usuario.edad = parseInt($('#edad').val());
        usuario.telefono = $('#telefono').val();
        usuario.correo = $('#correo').val();
        usuario.direccion = $('#ubicacion').val();
        usuario.fotoPerfil = $('#foto_perfil').val();
        usuario.password = $('#password').val();
        //usuario.activo = true;

        const API_URL_BASE = "https://simepciapi.azurewebsites.net/";
        var api_url = API_URL_BASE + "api/Usuario/CreateUsuario";

        console.log(usuario);
       
        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: api_url,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(usuario),
            hasContent: true
        }).done(function (result) {
            
            var segundo_api_url = API_URL_BASE + "api/RegistroOtp/CrearRegistroOtp";
            var correo = $('#correo').val();

            console.log(correo);
            $.ajax({
               
                method: "POST",
                url: segundo_api_url,
                data: correo, // Enviar el correo como un string
                success: function (response) {
                    // Manejar la respuesta del servidor si es necesario
                    console.log("Respuesta del servidor:", response);
                },
                error: function (xhr, textStatus, errorThrown) {
                    // Manejar errores si la solicitud falla
                    console.error("Error al enviar la solicitud:", errorThrown);
                }

            }).done(function (result) {
               
                Swal.fire({
                    title: 'Ingrese el código de verificación',
                    input: 'text',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    showLoaderOnConfirm: true,
                    preConfirm: (codigo) => {
             
                        return $.ajax({
                            method: "GET",
                            url: API_URL_BASE + "api/RegistroOtp/ValidarOtp",
                            data: {
                                codigo: codigo,
                                correo: usuario.correo
                            }
                        });
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    // Mostrar mensaje de éxito o error según la respuesta del servidor
                    if (result.value && result.value.correcto) {
                        Swal.fire({
                            title: 'Código verificado!',
                            icon: 'success',
                            text: 'Usuario creado correctamente',
                            timer: 2000
                        });
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            icon: 'error',
                            text: 'Código de verificación incorrecto',
                        });
                    }
                });
            });
        });
    }
}

$(document).ready(function () {
    var view = new CrearUsuario();
    view.InitView();
});*/

function CrearUsuario() {
    this.InitView = function () {
        $('form').submit(function (event) {
            event.preventDefault();
            submitCrearUsuario();
        });
    }

    function submitCrearUsuario() {
        var usuario = obtenerDatosUsuario();

        const API_URL_BASE = "https://simepciapi.azurewebsites.net/";
        var api_url = API_URL_BASE + "api/Usuario/CreateUsuario";

        console.log(usuario);

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: api_url,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(usuario),
            hasContent: true
        }).done(function (result) {
            enviarCodigoOTP(usuario.correo);
        }).fail(function (xhr, textStatus, errorThrown) {
            console.error("Error al crear usuario:", errorThrown);
        });
    }

    function obtenerDatosUsuario() {
        var usuario = {
            nombre: $('#nombre').val(),
            primerApellido: $('#apellido1').val(),
            segundoApellido: $('#apellido2').val(),
            cedula: $('#identificacion').val(),
            fechaNacimiento: new Date($('#fecha_nacimiento').val()).toISOString(),
            telefono: $('#telefono').val(),
            correo: $('#correo').val(),
            direccion: $('#ubicacion').val(),
            fotoPerfil: $('#foto_perfil').val(),
            password: $('#password').val()
        };

        return usuario;
    }

    function enviarCodigoOTP(correo) {
        var segundo_api_url = API_URL_BASE + "api/RegistroOtp/CrearRegistroOtp";
        
        var correoUsuario = $('#correo').val(); 
        $.ajax({
            method: "POST",
            url: segundo_api_url,
            data: correoUsuario, 
            success: function (response) {
                console.log("Código OTP enviado correctamente.");
                console.log("Respuesta del servidor:", response);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error al enviar el código OTP:", errorThrown);
                console.log("Texto de la respuesta del servidor:", xhr.responseText);
            }
        });
    }
}

var view = new CrearUsuario();
view.InitView();