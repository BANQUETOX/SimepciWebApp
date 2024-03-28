document.addEventListener('DOMContentLoaded', function () {
    var editarBotones = document.querySelectorAll('.editar');

    editarBotones.forEach(function (boton) {
        boton.addEventListener('click', function () {
            // Lógica para editar el reporte financiero
            console.log('Editar reporte financiero');
        });
    });
});