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
});



//crear usuario

/*function CrearUsuario() {
    this.InitView = function () {
        $('form').submit(function (event) {
            event.preventDefault();
            submitCrearUsuario();
        });
    }

    function submitCrearUsuario() {
        var usuario = obtenerDatosUsuario();

        const API_URL_BASE = "https://simepciapii.azurewebsites.net/";
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
            validarCodigoOTP(usuario.correo);
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
            fotoPerfil: $('#url_imagen_cloudinary').val(),
            password: $('#password').val(),
            sexo: $("input[name='sexo']:checked").val()
        };

        return usuario;
    }

    function enviarCodigoOTP(correo) {
        var segundo_api_url = API_URL_BASE + "api/RegistroOtp/CrearRegistroOtp";

        segundo_api_url += "?correoUsuario=" + encodeURIComponent(correo);

        console.log(correo);

        $.ajax({
            method: "POST",
            url: segundo_api_url,
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
    function validarCodigoOTP(correo) {
        Swal.fire({
            title: 'Ingrese el código',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                const codigo = result.value;
                const url = `${API_URL_BASE}api/RegistroOtp/ValidarOtp?correoUsuario=${encodeURIComponent(correo)}&otpInput=${encodeURIComponent(codigo)}`;

                $.ajax({
                    method: 'GET',
                    url: url,
                    dataType: 'text'
                }).then((response) => {
                    console.log(response); // Agrega este console.log para ver la respuesta del servidor
                    if (response.toLowerCase() === "true") {
                        Swal.fire('Éxito', 'Cuenta registrada', 'success').then(() => {
                            window.location.href = '../InicioSesion/InicioSesion';
                        });
                    } else {
                        Swal.fire('Error', 'El código es inválido.', 'error').then(() => {
                            validarCodigoOTP(correo);
                        });
                    }
                }).catch((error) => {
                    console.error('Error al validar el código OTP:', error);
                    Swal.fire('Error', 'Hubo un problema al validar el código OTP.', 'error');
                });
            }
        });
    }
}*/


function CrearUsuario() {
    this.InitView = function () {
        $('form').submit(function (event) {
            event.preventDefault();
            enviarCodigoOTP(); // Llamar a enviarCodigoOTP primero
        });
    }

    function enviarCodigoOTP() {
        var usuario = obtenerDatosUsuario();
        const correo = usuario.correo; // Obtener el correo del usuario
        const API_URL_BASE = "https://simepciapii.azurewebsites.net/";
        var segundo_api_url = API_URL_BASE + "api/RegistroOtp/CrearRegistroOtp";

        segundo_api_url += "?correoUsuario=" + encodeURIComponent(correo);

        console.log(correo);

        $.ajax({
            method: "POST",
            url: segundo_api_url,
            success: function (response) {
                console.log("Código OTP enviado correctamente.");
                console.log("Respuesta del servidor:", response);
                validarCodigoOTP(correo); // Llamar a validarCodigoOTP después
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error al enviar el código OTP:", errorThrown);
                console.log("Texto de la respuesta del servidor:", xhr.responseText);
            }
        });
    }

    function validarCodigoOTP(correo) {
        Swal.fire({
            title: 'Ingrese el código',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                const codigo = result.value;
                const url = `${API_URL_BASE}api/RegistroOtp/ValidarOtp?correoUsuario=${encodeURIComponent(correo)}&otpInput=${encodeURIComponent(codigo)}`;

                $.ajax({
                    method: 'GET',
                    url: url,
                    dataType: 'text'
                }).then((response) => {
                    console.log(response); // Agrega este console.log para ver la respuesta del servidor
                    if (response.toLowerCase() === "true") {
                        Swal.fire('Éxito', 'Cuenta registrada', 'success').then(() => {
                            submitCrearUsuario(); // Llamar a submitCrearUsuario si la validación del código es exitosa
                        });
                    } else {
                        Swal.fire('Error', 'El código es inválido.', 'error').then(() => {
                            validarCodigoOTP(correo);
                        });
                    }
                }).catch((error) => {
                    console.error('Error al validar el código OTP:', error);
                    Swal.fire('Error', 'Hubo un problema al validar el código OTP.', 'error');
                });
            }
        });
    }

    function submitCrearUsuario() {
        var usuario = obtenerDatosUsuario();
        const API_URL_BASE = "https://simepciapii.azurewebsites.net/";
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
            // Aquí puedes realizar alguna acción adicional si es necesario
            console.log("Usuario creado correctamente.");
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
            fotoPerfil: $('#url_imagen_cloudinary').val(),
            password: $('#password').val(),
            sexo: $("input[name='sexo']:checked").val()
        };

        return usuario;
    }
}

var view = new CrearUsuario();
view.InitView();

