$(document).ready(function () {
    $('#formRegistrarExpediente').submit(function (event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente
        registrarExpediente();
    });
});

function registrarExpediente() {
    const correoPaciente = $('#correoPaciente').val();
    const notasEnfermeria = $('#notasEnfermeria').val();
    const notasMedicas = $('#notasMedicas').val();
    const historialMedico = $('#historialMedico').val();

    const expediente = {
        correoPaciente: correoPaciente,
        notasEnfermeria: notasEnfermeria,
        notasMedicas: notasMedicas,
        historialMedico: historialMedico
    };

    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/Expediente/CrearExpediente',
        method: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(expediente),
        success: function (data) {
            // Muestra una ventana emergente indicando que la operación se realizó con éxito
            Swal.fire('Éxito', 'El expediente se registró correctamente', 'success');
            // No redirige a ninguna página, solo muestra el mensaje
        },
        error: function (xhr, status, error) {
            console.error('Error al enviar los datos al API:', error);
            // Muestra una ventana emergente indicando que ocurrió un error
            Swal.fire('Error', 'Ocurrió un error al registrar el expediente', 'error');
            // Aquí puedes manejar el error como prefieras
        }
    });
}


