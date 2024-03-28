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
            {
                title: 'Sede Cartago',
                start: '2024-03-24T07:30:00',
                backgroundColor: '#007bff',
                borderColor: '#007bff'
            },
            {
                title: 'Sede Cartago',
                start: '2024-03-24T11:00:00',
                backgroundColor: '#28a745',
                borderColor: '#28a745'
            },
            {
                title: 'Sede San José',
                start: '2024-03-24T14:00:00',
                backgroundColor: '#dc3545',
                borderColor: '#dc3545'
            },
            {
                title: 'San José',
                start: '2024-03-24T16:00:00',
                backgroundColor: '#ffc107',
                borderColor: '#ffc107'
            }
        ]
    });
    calendar.render();
});