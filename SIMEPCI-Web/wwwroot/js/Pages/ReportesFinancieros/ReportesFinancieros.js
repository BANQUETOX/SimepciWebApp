document.addEventListener('DOMContentLoaded', function () {
    var editarBotones = document.querySelectorAll('.editar');
    editarBotones.forEach(function (boton) {
        boton.addEventListener('click', function () {
            var reporteCard = boton.closest('.reporte-card');
            var fecha = reporteCard.querySelector('.fecha').textContent;
            var cedulaCliente = reporteCard.querySelector('.cedula-cliente').textContent;
            var sede = reporteCard.querySelector('.sede').textContent;
            var doctor = reporteCard.querySelector('.doctor').textContent;
            var costoCita = reporteCard.querySelector('.costo-cita').textContent;

            console.log('Editar reporte financiero:');
            console.log('Fecha:', fecha);
            console.log('Cédula del cliente:', cedulaCliente);
            console.log('Sede:', sede);
            console.log('Doctor:', doctor);
            console.log('Costo de cita:', costoCita);
        });
    });
});