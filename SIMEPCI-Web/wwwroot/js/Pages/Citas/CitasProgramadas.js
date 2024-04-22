function CitasProgramadas() {
    this.InitView = function () {
        this.CalendarioRol();
    }
    this.CuposDisponiblesPaciente = function () {
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
                    title: 'Cita '+cita.especialidad,
                    start: cita.fecha,
                    end: cita.fecha 
                };
            });

            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
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
                events: eventosFiltrados
            });
            calendar.render();
        }).fail(function (error) {
            console.error('Error al obtener citas reservadas:', error);
        });
    }
    this.CuposDisponiblesDoctor = function () {

        var correo = sessionStorage.getItem('correo');
        console.log(correo)
        var url_base = 'https://simepciapii.azurewebsites.net/api/Cita/GetCitasDoctor?correoDoctor=';
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
                    title: 'Cita ' + cita.nombrePaciente,
                    start: cita.horaInicio,
                    end: cita.horaFinal
                };
            });

            var calendarEl = document.getElementById('calendarDoctor');
            var calendar = new FullCalendar.Calendar(calendarEl, {
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
                events: eventosFiltrados
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
                break;
            case 'Doctor':
                this.CuposDisponiblesDoctor();
                calendar.style.display = 'none';
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