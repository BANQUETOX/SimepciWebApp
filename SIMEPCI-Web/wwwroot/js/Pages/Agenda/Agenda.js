
            document.addEventListener('DOMContentLoaded', function () {
            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                locale: 'es',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                events: [
        @foreach (var cita in Model)
        {
            <text>
                        {
                            title: '@cita.Procedimiento',
                            start: '@cita.Fecha.ToString("yyyy-MM-ddTHH:mm:ss")',
                            backgroundColor: '@(cita.Confirmada ? "#007bff" : "#dc3545")',
                            borderColor: '@(cita.Confirmada ? "#007bff" : "#dc3545")'
                        },
            </text>
        }
                        ]
            });
            calendar.render();
        });
 