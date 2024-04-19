var IdEspecialidadSeleccionada = "";
var IdSedeSeleccionada = "";
function RegistrarCita() {
    this.InitView = function () {
        this.GetAllEspecialidades();
        this.GetAllSedes();
        this.SeleccionarEspecialidad();
        this.SeleccionarSede();
    }
    this.SeleccionarEspecialidad = function () {
        $('#especialidad').change(function () {
            var especialidadSeleccionadaId = $(this).find(":selected").attr('id');
            IdEspecialidadSeleccionada = especialidadSeleccionadaId;
            console.log("ID de especialidad seleccionada :", IdEspecialidadSeleccionada);
        });
    }
    this.SeleccionarSede = function () {
        $('#sede').change(function () {
            var sedeSeleccionadaId = $(this).find(":selected").attr('id');
            IdSedeSeleccionada = sedeSeleccionadaId;
            console.log("ID de sede seleccionada :", IdSedeSeleccionada);
        });
    }
    this.GetAllEspecialidades = function () {
        var url_base = 'https://simepciapii.azurewebsites.net/api/EspecialidadMedica/GetAllEspecialidadesMedicas';
        $.ajax({
            url: url_base,
            method: 'GET',
            contentType: 'application/json;charset=utf-8',
            dataType: "json"
        }).done(function (result) {
            var listaEspecialidades = $('#especialidad');
            var select = $('<select>');

            $('<option>').text('Seleccione una especialidad').attr('disabled', 'disabled').attr('selected', 'selected').appendTo(select);

            $.each(result, function (index, especialidad) {
                $('<option>').text(especialidad.nombre).attr('id', especialidad.id).val(especialidad.id).appendTo(select);
            });
            listaEspecialidades.append(select);
        }).fail(function (error) {
            console.log(error);
        });
    }

    this.GetAllSedes = function () {
        var url_base = 'https://simepciapii.azurewebsites.net/api/Sede/GetAllSedes';
        $.ajax({
            url: url_base,
            method: 'GET',
            contentType: 'application/json;charset=utf-8',
            dataType: "json"
        }).done(function (result) {
            var listaSedes = $('#sede');
            var select = $('<select>');
            $('<option>').text('Seleccione una sede').attr('disabled', 'disabled').attr('selected', 'selected').appendTo(select);
            $.each(result, function (index, sede) {
                $('<option>').text(sede.nombre).attr('id', sede.id).val(sede.id).appendTo(select);
            });
            listaSedes.append(select);
        }).fail(function (error) {
            console.log(error);
        });
    }
    this.CuposDisponibles = function () {
        console.log("ID de especialidad seleccionada (desde otro método):", IdEspecialidadSeleccionada);
        console.log("ID de sede seleccionada (desde otro método):", IdSedeSeleccionada);
    }
}
$(document).ready(function () {
    var view = new RegistrarCita();
    view.InitView();
    view.CuposDisponibles();
});
