function RegistarReceta() {
    this.InitView = function () {
        $('#btnRegistrar').click(function () {

            var view = new RegistarReceta();
            view.ValidarCampos();
        });

    }

    this.ValidarCampos = function () {
        var profMed = $('#txtProfesionalMed').val();
        console.log(profMed);
        var emision = $('#txtEmision').val();
        var nombreMed = $('#txtNombreMedicamento').val();
        console.log(nombreMed);
        var dosis = $('#txtDosis').val();
        console.log(dosis);
        var duracionTratamiento = $('#txtDuracionTratamiento').val();
        console.log(duracionTratamiento);
        var recomendaciones = $('#txtRecomendacionesAdicionales').val();
        console.log(recomendaciones);
        if (profMed == "" || nombreMed == "" || dosis == "" || duracionTratamiento == "" || emision === null) {
            Swal.fire({
                icon: 'error',
                title: 'Ha ocurrido un error',
                text: 'Llenar la informacion para el registro de medicamentos'
            })
        }
        this.limpiarCampos();
    }
    this.limpiarCampos = function () {
        $('#txtProfesionalMed').val("");
        $('#txtEmision').val("");
        $('#txtNombreMedicamento').val("");
        $('#txtDosis').val("");
        $('#txtDuracionTratamiento').val("");
        $('#txtRecomendacionesAdicionales').val("");
    }
}
$(document).ready(function () {
    var view = new RegistarReceta();
    view.InitView();
})