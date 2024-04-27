function MostrarExpediente() {
    var _this = this;

    this.InitView = function () {
        this.validacionRol();
        $('#examenForm').submit(function (event) {
            event.preventDefault();
            _this.GetExpedienteFuncionario();
        });
    }

    this.GetExpedientePaciente = function () {
        var correo = sessionStorage.getItem('correo');
        var url_base = 'https://simepciapii.azurewebsites.net/api/Expediente/ExpedienteCompletoPaciente?correoPaciente=';

        $.ajax({
            url: url_base + correo,
            method: 'GET',
            contentType: 'application/json,charset=utf-8',
            dataType: 'json'
        }).done(function (result) {
            console.log(result);
            _this.MostrarExpediente(result);
        }).fail(function (error) {
            console.log(error);
        });
    }

    this.GetExpedienteFuncionario = function () {
        var correo = $('#correoPaciente').val();
        var url_base = 'https://simepciapii.azurewebsites.net/api/Expediente/ExpedienteCompletoPaciente?correoPaciente=';

        $.ajax({
            url: url_base + correo,
            method: 'GET',
            contentType: 'application/json,charset=utf-8',
            dataType: 'json'
        }).done(function (result) {
            console.log(result);
            _this.MostrarExpediente(result);
        }).fail(function (error) {
            console.log(error);
        });
    }

    this.MostrarExpediente = function (result) {
        _this.CrearCuadro(result.notasEnfermeria, 'notasEnfermeria');
        _this.CrearCuadro(result.notasMedicas, 'notasMedicas');
        _this.CrearCuadro(result.antecedentesMedicos, 'antecedentesMedicosContainer');
        _this.CrearCuadro(result.citas, 'citasContainer');
        _this.CrearCuadro(result.examenesMedicos, 'examenesMedicosContainer');
        _this.CrearCuadro(result.recetas, 'recetasContainer');
        _this.CrearCuadro(result.facturas, 'facturasContainer');
        _this.CrearCuadro(result.diagnosticos, 'diagnosticosContainer');
        document.getElementById('expedienteContainer').style.display = 'block';
    }

    this.CrearCuadro = function (result, id) {
        var divContenedor = document.getElementById(id);
        divContenedor.innerHTML = '';

        if (!result || result.length === 0) {
            var mensaje = document.createElement('p');
            mensaje.textContent = 'No hay datos que mostrar.';
            divContenedor.appendChild(mensaje);
            return;
        }

        result.forEach(function (elemento, index) {
            var item = document.createElement('div');
            for (var key in elemento) {
                var parrafoP = document.createElement('p');
                parrafoP.textContent = key + ": " + elemento[key];
                item.appendChild(parrafoP);
            }
            divContenedor.appendChild(item);
            if (index < result.length - 1) {
                var divider = document.createElement('hr');
                divider.classList.add('division');
                divContenedor.appendChild(divider);
            }
        });
    }

    this.validacionRol = function () {
        var rol = sessionStorage.getItem('rol');
        if (rol !== 'Paciente') {
            document.getElementById('cuadroFormulario').style.display = 'block';
        } else {
            this.GetExpedientePaciente();
        }
    }
}

$(document).ready(function () {
    var view = new MostrarExpediente();
    view.InitView();
});