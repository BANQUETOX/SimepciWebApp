var nombreCompleto = "";
var IdEspecialidadSeleccionada = "";
var IdSedeSeleccionada = "";
var rol = sessionStorage.getItem('rol');
var calendar;

function RegistrarCita() {
    this.InitView = function () {
        this.habilitarCampos();
        this.GetAllSedes();
        this.SeleccionarSede();
        this.SeleccionarEspecialidad();
        $('#btnCuposDisponiblesDoctor').click(() => {
            this.CuposDisponibles();
        });
        $('#btnCuposDisponiblesPaciente').click(() => {
            this.CuposDisponiblesPaciente();
        });
        $('#btnBuscar').click(() => {
            this.GetPacienteCorreo();
        });
        console.log(rol);
    }
    this.SeleccionarEspecialidad = function () {
        $('#especialidad').change(function () {
            IdEspecialidadSeleccionada = $(this).find(":selected").attr('id');
            console.log("ID de especialidad seleccionada :", IdEspecialidadSeleccionada);
        });
    }
    this.SeleccionarSede = function () {
        $('#sede').change(() => {
            IdSedeSeleccionada = $('#sede option:selected').val();
            console.log("ID de sede seleccionada :", IdSedeSeleccionada);
            this.GetAllEspecialidadesBySede();
        });
    }
    this.GetAllEspecialidadesBySede = function () {
        var url_base = 'https://simepciapii.azurewebsites.net/api/EspecialidadMedica/GetEspecialidadesMedicasSede?idSede=';
        $.ajax({
            url: url_base + IdSedeSeleccionada,
            method: 'GET',
            contentType: 'application/json;charset=utf-8',
            dataType: "json"
        }).done(function (result) {
            var listaEspecialidades = $('#especialidad');
            listaEspecialidades.empty();
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
        var url_base = 'https://simepciapii.azurewebsites.net/api/Cita/GetCitasReservadas?idEspecialidad=';
        $.ajax({
            url: url_base + IdEspecialidadSeleccionada + '&idSede=' + IdSedeSeleccionada,
            method: 'GET',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).done(function (response) {
            var eventosFiltrados = response.map(function (cita) {
                return {
                    id: cita.id,
                    title: 'Cita ' + cita.especialidad,
                    start: cita.horaInicio,
                    end: cita.horaFinal
                };
            });
            var calendarEl = document.getElementById('calendarioDisponible');
            calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'Week,dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                },
                customButtons: {
                    Week: {
                        text: 'Week',
                        click: function () {
                            calendar.changeView('timeGridWeek');
                        }
                    }
                },
                initialView: 'timeGridWeek',
                slotDuration: '00:30:00',
                events: eventosFiltrados,
                selectable: true,
                select: function (info) {
                    var horaInicio = info.startStr;
                    var horaFinal = moment(info.start).add(30, 'minutes').format();
                    var correoPaciente = $('#correoUsuario').val();
                    var cita = {
                        correoPaciente: correoPaciente,
                        horaInicio: horaInicio,
                        horaFinal: horaFinal,
                        idSede: IdSedeSeleccionada,
                        idEspecialidad: IdEspecialidadSeleccionada
                    };
                    verificarDisponibilidad(cita);
                }
            });
            calendar.render();
        }).fail(function (error) {
            console.error('Error al obtener citas reservadas:', error);
        });
    }
    this.CuposDisponiblesPaciente = function () {
        var url_base = 'https://simepciapii.azurewebsites.net/api/Cita/GetCitasReservadas?idEspecialidad=';
        $.ajax({
            url: url_base + IdEspecialidadSeleccionada + '&idSede=' + IdSedeSeleccionada,
            method: 'GET',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).done(function (response) {
            var eventosFiltrados = response.map(function (cita) {
                return {
                    id: cita.id,
                    title: 'Cita ' + cita.especialidad,
                    start: cita.horaInicio,
                    end: cita.horaFinal
                };
            });
            var calendarEl = document.getElementById('calendarioDisponible');
            calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'Week,dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                },
                customButtons: {
                    Week: {
                        text: 'Week',
                        click: function () {
                            calendar.changeView('timeGridWeek');
                        }
                    }
                },
                initialView: 'timeGridWeek',
                slotDuration: '00:30:00',
                events: eventosFiltrados,
                selectable: true,
                select: function (info) {
                    var horaInicio = info.startStr;
                    var horaFinal = moment(info.start).add(30, 'minutes').format();
                    var correoPaciente = sessionStorage.getItem('correo');
                    var cita = {
                        correoPaciente: correoPaciente,
                        horaInicio: horaInicio,
                        horaFinal: horaFinal,
                        idSede: IdSedeSeleccionada,
                        idEspecialidad: IdEspecialidadSeleccionada
                    };
                    verificarDisponibilidad(cita);
                }
            });
            calendar.render();
        }).fail(function (error) {
            console.error('Error al obtener citas reservadas:', error);
        });
    }
    function verificarDisponibilidad(cita) {
        //Pendiente editar mensajes para mostrar la info antes de confirmar o cancelar
        var horaInicioFormateada = moment(cita.horaInicio).format('YYYY-MM-DD HH:mm');
        Swal.fire({
            title: '¿Estás seguro de registrar la cita?',
            text: 'Una vez registrada, no se podrá deshacer esta acción' + horaInicioFormateada,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, registrar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                crearCita(cita);
            } else {
                Swal.fire({
                    title: 'Acción cancelada',
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }
    this.GetPacienteCorreo = function () {
        var correo = $('#correoUsuario').val();
        var url_base = 'https://simepciapii.azurewebsites.net/api/Usuario/GetUsuarioByCorreo?correo=';
        $.ajax({
            url: url_base + correo,
            method: 'GET',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).done(function (result) {
            nombreCompleto = result.nombre + ' ' + result.primerApellido + ' ' + result.segundoApellido;
            console.log(nombreCompleto);
            $('#nombreUsuario').val(nombreCompleto);
        }).fail(function (error) {
            console.log(error);
        });
    }
    this.habilitarCampos = function () {
        switch (rol) {
            case 'Paciente':
                btnCuposDisponiblesDoctor.style.display = 'none';
                textoCorreo.style.display = 'none';
                campoCorreo.style.display = 'none';
                campoNombre.style.display = 'none';
                btnBuscar.style.display = 'none';
                break;
            case 'Enfermero':

                break;
            case 'Administrador':

                break;
            case 'Secretario':

                break;
            case 'Doctor':
                btnCuposDisponiblesPaciente.style.display = 'none';
                break;
            default:
                break;
        }
    }
}
function crearCita(cita) {
    var url_base = 'https://simepciapii.azurewebsites.net/api/Cita/CrearCita';
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        url: url_base,
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(cita),
        hasContent: true
    }).done(function (result) {
        console.log(result)
        Swal.fire({
            icon: 'success',
            title: 'Cita creada correctamente',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "/Citas/CitasProgramadas";
        });
    }).fail(function (error) {
        console.log(error)
    });
}
$(document).ready(function () {
    var view = new RegistrarCita();
    view.InitView();
});
