function submitEncuesta() {
    var encuestaData = obtenerDatosEncuesta();
    enviarEncuesta(encuestaData);
}

function obtenerDatosEncuesta() {
    var recomendariaValue = document.querySelector('select[name="recomendaria"]').value;
    var recomendaria = recomendariaValue === "si" ? true : false;
    var encuesta = {
        satisfaccion: document.querySelector('input[name="satisfaccion"]').value,
        profecionalismo: document.querySelector('input[name="profecionalismo"]').value,
        instalaciones: document.querySelector('input[name="instalaciones"]').value,
        recomendaria: recomendaria,
        comentarios: document.querySelector('textarea[name="comentarios"]').value
    };

    return encuesta;
}

function enviarEncuesta(encuestaData) {
    const API_URL_BASE = "https://simepciapii.azurewebsites.net/";
    var api_url = API_URL_BASE + "api/Comentario/CrearComentario";

    console.log(encuestaData);

    fetch(api_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(encuestaData)
    })
        .then(response => {
            if (response.ok) {
                console.log("Encuesta enviada correctamente.");
                mostrarMensaje();
                
            } else {
                console.error("Error al enviar la encuesta:", response.statusText);
                
            }
        })
        .catch(error => {
            console.error("Error al enviar la encuesta:", error);
            alert('Ocurrió un error al enviar la encuesta. Por favor, intenta de nuevo más tarde.');
        });
}

function mostrarMensaje() {
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Encuesta registrada.',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {

            window.location.href = '../Perfil/Perfil';
        }
    });
}