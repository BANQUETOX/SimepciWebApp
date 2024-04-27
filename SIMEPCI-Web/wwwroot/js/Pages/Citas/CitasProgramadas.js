function CitasProgramadas() {
    var calendar = "";
    this.InitView = function () {
        this.CalendarioRol();

    }

    this.CuposDisponiblesSecretario = function () {
        var _this = this;
        var correo = $('#correoPaciente').val();
        var url_base = 'https://simepciapii.azurewebsites.net/api/Cita/GetCitasPaciente?correoPaciente=';
        $.ajax({
            url: url_base + correo,
            method: 'GET',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).done(function (response) {
            console.log(response);
            var eventosFiltrados = response.map(function (cita) {
                return {
                    id: cita.id,
                    title: cita.especialidad,
                    start: cita.fecha,
                    end: cita.fecha
                };
            });

            var calendarEl = document.getElementById('calendarPaciente');
            calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
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
                eventClick: function (info) {
                    var evento = info.event;
                    var fechaCita = evento.start;
                    var fechaActual = new Date();
                    if (fechaCita > fechaActual) {
                        var fechaCitaFormateada = fechaCita.toLocaleDateString();
                        var horaCita = fechaCita.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        Swal.fire({
                            icon: 'info',
                            html: 'Cita de : ' + evento.title + '<br></br>' + 'Fecha de la cita: ' + fechaCitaFormateada + ' ' + horaCita,
                            title: '¿Eliminar Cita?',
                            text: '¿Quieres eliminar este registro?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Sí, eliminar',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                _this.EliminarCita(evento.id);
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Esta cita ya ha pasado',
                            text: 'No es posible eliminar citas pasadas',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Entendido'
                        });
                    }
                }
            });
            calendar.render();
        }).fail(function (error) {
            console.error('Error al obtener citas reservadas:', error);
        });
    }

    this.CuposDisponiblesPaciente = function () {
        var _this = this;
        var correo = sessionStorage.getItem('correo');
        var url_base = 'https://simepciapii.azurewebsites.net/api/Cita/GetCitasPaciente?correoPaciente=';
        $.ajax({
            url: url_base + correo,
            method: 'GET',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).done(function (response) {
            console.log(response);
            var eventosFiltrados = response.map(function (cita) {
                return {
                    id: cita.id,
                    title: cita.especialidad,
                    start: cita.fecha,
                    end: cita.fecha
                };
            });

            var calendarEl = document.getElementById('calendarPaciente');
            calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
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
                eventClick: function (info) {
                    var evento = info.event;
                    var fechaCita = evento.start;
                    var fechaActual = new Date();
                    if (fechaCita > fechaActual) {
                        var fechaCitaFormateada = fechaCita.toLocaleDateString();
                        var horaCita = fechaCita.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        Swal.fire({
                            icon: 'info',
                            html: 'Cita de : ' + evento.title + '<br></br>' + 'Fecha de la cita: ' + fechaCitaFormateada + ' ' + horaCita,
                            title: '¿Eliminar Cita?',
                            text: '¿Quieres eliminar este registro?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Sí, eliminar',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                _this.EliminarCita(evento.id);
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Esta cita ya ha pasado',
                            text: 'No es posible eliminar citas pasadas',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Entendido'
                        });
                    }
                }
            });
            calendar.render();
        }).fail(function (error) {
            console.error('Error al obtener citas reservadas:', error);
        });
    }
    this.EliminarCita = function (id) {
        var url_base = 'https://simepciapii.azurewebsites.net/api/Cita/CancelarCita?idCita=';
        $.ajax({
            method: 'DELETE',
            url: url_base + id,
            contentType: 'application/json;charset=utf-8',
        }).done(function (result) {
            console.log(result);
            if (result !== 'Cita eliminada') {
                console.log(result);
                Swal.fire({
                    icon: 'warning',
                    title: 'La cita no pudo ser cancelada',
                    text: result,
                    showConfirmButton: true
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'La cita fue eliminada exitosamente',
                    showConfirmButton: true
                }).then((result) => {
                    window.location.href = window.location.href
                });
            }
        }).fail(function (error) {
            console.error('Error al eliminar la cita:', error);
        });
    }
    this.CuposDisponiblesDoctor = function () {
        var _this = this;
        var correo = sessionStorage.getItem('correo');
        console.log(correo)
        var url_base = 'https://simepciapii.azurewebsites.net/api/Cita/GetCitasDoctor?correoDoctor=';
        $.ajax({
            url: url_base + correo,
            method: 'GET',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).done(function (result) {
            console.log(result);
            var eventosFiltrados = result.map(function (cita) {
                return {
                    id: cita.id,
                    title: cita.nombrePaciente,
                    start: cita.horaInicio,
                    end: cita.horaFinal
                };
            });

            var calendarEl = document.getElementById('calendarDoctor');
            calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
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
                eventClick: function (info) {
                    var evento = info.event;
                    var fechaCita = evento.start;
                    var fechaMaxCancelacion = new Date();
                    fechaMaxCancelacion.setHours(fechaMaxCancelacion.getHours() + 24);
                    if (fechaCita > fechaMaxCancelacion) {
                        var fechaCitaFormateada = fechaCita.toLocaleDateString();
                        var horaCita = fechaCita.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        Swal.fire({
                            icon: 'info',
                            html: 'Cita de : ' + evento.title + '<br></br>' + 'Fecha de la cita: ' + fechaCitaFormateada + ' ' + horaCita,
                            title: '¿Eliminar Cita?',
                            text: '¿Quieres eliminar este registro?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Sí, eliminar',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                _this.EliminarCita(evento.id);
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'No es posible cancelar esta cita',
                            text: 'No es posible eliminar citas pasadas o con menos de 24 horas antes de su hora de inicio',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Entendido'
                        });
                    }
                }
            });
            calendar.render();
        }).fail(function (error) {
            console.error('Error al obtener citas reservadas:', error);
        });
    }
    this.GetAllCitasAdministrador = function () {
        var url_base = 'https://simepciapii.azurewebsites.net/api/Cita/GetAllCitas';
        $.ajax({
            url: url_base,
            method: 'GET',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).done(function (result) {
            console.log('Result desde getAllcitas ');
            console.log( result);
            var eventosFiltrados = result.map(function (cita) {
                return {
                    id: cita.id,
                    title: 'Paciente id: '+cita.idPaciente+', Doctor id: '+cita.idDoctor+', Sede id: '+cita.idSede,
                    start: cita.horaInicio,
                    end: cita.horaFinal
                };
            });

            var calendarEl = document.getElementById('calendarAdministrador');
            calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
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
                eventClick: function (info) {
                    var evento = info.event;
                    var fechaCita = evento.start;
                    var fechaCitaFormateada = fechaCita.toLocaleDateString();
                    var horaCita = fechaCita.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    Swal.fire({
                        icon: 'info',
                        html: evento.title + '<br></br>' + 'Fecha de la cita: ' + fechaCitaFormateada + ' ' + horaCita,
                        title: 'Cita Medica',
                        showCancelButton: false
                    });
                  }
            });
            calendar.render();
        }).fail(function (error) {
            console.error('Error al obtener citas reservadas:', error);
        });
    }

    this.CalendarioRol = function () {
        var rol = sessionStorage.getItem('rol');
        switch (rol) {
            case 'Paciente':
                this.CuposDisponiblesPaciente();
                calendarDoctor.style.display = 'none';
                calendarAdministrador.style.display = 'none';
                break;
            case 'Doctor':
                this.CuposDisponiblesDoctor();
                calendarPaciente.style.display = 'none';
                calendarAdministrador.style.display = 'none';
                break;
            case 'Administrador':
                this.GetAllCitasAdministrador();
                calendarPaciente.style.display = 'none';
                calendarDoctor.style.display = 'none';
                textoEliminar.style.display = 'none';
                break;
            case 'Secretario':
                this.CuposDisponiblesDoctor();
                calendarPaciente.style.display = 'none';
                calendarAdministrador.style.display = 'none';
                break;
            default:
                break;
        }

    }
}
$(document).ready(function () {
    var view = new CitasProgramadas();
    view.InitView();
});