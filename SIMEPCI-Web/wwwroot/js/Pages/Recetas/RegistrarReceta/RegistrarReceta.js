function RegistarReceta() {
    var nombreCompleto = "";
    var idPaciente = "";
    var nombreMed = "";
    var dosis = "";
    var duracionTratamiento = "";
    var recomendaciones = "";
    var nombrePaciente = "";

    this.InitView = function () {
        this.ListarPaciente();
        $('#btnRegistrar').click(function () {
            var view = new RegistarReceta();
            view.ValidarCampos();
        });
    }
    this.RegistrarReceta = function () {
        var receta = {};
        receta.idUsuario = sessionStorage.getItem('id');
        receta.imagen = "";
        receta.medicamento = nombreMed;
        receta.dosis = dosis;
        receta.diasDosis = duracionTratamiento;
        receta.recomendaciones = recomendaciones;
        console.log("id usuario " + sessionStorage.getItem('id'));
        console.log("medicamento" + nombreMed);
        console.log("dosis" + dosis);
        console.log("diasDosis" + duracionTratamiento);
        console.log("recomendaciones " + recomendaciones);
        var api_base = 'https://simepciapii.azurewebsites.net/api/Receta/CreateReceta';
        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: api_base,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(receta),
            hasContent: true
        }).done(function (result) {
            console.log('El resultado del ajax ' + result);
            Swal.fire({
                icon: "success",
                title: "Registro exitoso",
                text: "La receta fue registrada exitosamente",
                timer:20000
            }).then(
                function () {
                    location.reload();
                }
            )
        }).fail(function (error) {
            console.log("Error" + error);
        });
    }
    this.ListarPaciente = function () {
        $.ajax({
            url: "https://simepciapii.azurewebsites.net/api/Usuario/GetAllUsers",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (result) {
            console.log("Estos fueron los datos que recibimos del API", result);
            gridOptions.api.setRowData(result);
        }).fail(function (error) {
            console.log("Error del ajax ", error);
            Swal.fire({
                icon: "error",
                title: "Error al cargar pacientes",
                text: "Hubo un error " + error
            });
        });
    }
    this.ElegirPaciente = function (id) {
        $.ajax({
            url: "https://simepciapii.azurewebsites.net/api/Usuario/GetUsuarioById?id=" + id,
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (result) {
            nombreCompleto = result.nombre + " " + result.primerApellido;
            idPaciente = result.id;
            sessionStorage.setItem('id', idPaciente);
            console.log("session " + idPaciente);
            console.log("IdPaciente " + idPaciente);
            $('#txtPaciente').val(nombreCompleto);
        }).fail(function (error) {
            console.log("Error del ajax ", error);
            Swal.fire({
                icon: "error",
                title: "Error al cargar el detalle del paciente",
                text: "Hubo un error " + error
            });
        });
    }
    this.ValidarCampos = function () {
        nombrePaciente = $('#txtPaciente').val();
        nombreMed = $('#txtNombreMedicamento').val();
        dosis = $('#txtDosis').val();
        duracionTratamiento = $('#txtDuracionTratamiento').val();
        recomendaciones = $('#txtRecomendacionesAdicionales').val();
        console.log("nombre " + nombrePaciente)
        console.log("Medicamento " + nombreMed)
        console.log("Dosis " + dosis)
        console.log("tratamiento " + duracionTratamiento)
        if (nombrePaciente == "" || nombreMed == "" || dosis == "" || duracionTratamiento == "") {
            Swal.fire({
                icon: 'error',
                title: 'Ha ocurrido un error',
                text: 'Llenar la información para el registro de medicamentos'
            });
        } else {
            this.RegistrarReceta();
        }
    }
    this.limpiarCampos = function () {
        $('#txtPaciente').val("");
        $('#txtNombreMedicamento').val("");
        $('#txtDosis').val("");
        $('#txtDuracionTratamiento').val("");
        $('#txtRecomendacionesAdicionales').val("");
    }
}
$(document).ready(function () {
    var view = new RegistarReceta();
    view.InitView();
});
