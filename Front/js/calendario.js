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
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día'
        },
        events: [
            {
                title: 'Matrimonial - Ocupado',
                start: '2025-10-03',
                end: '2025-10-06',
                color: '#f7b57a'
            },
            {
                title: 'Monoambiente - Ocupado',
                start: '2025-10-08',
                end: '2025-10-10',
                color: '#f7b57a'
            },
            {
                title: 'Matrimonial - Ocupado',
                start: '2025-10-15',
                end: '2025-10-18',
                color: '#f7b57a'
            }
        ]
    });

    calendar.render();
});
