document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) return;

    const userId = user.id;

    await cargarAlojamientos(userId);
    await cargarReservas(userId);
});

async function cargarAlojamientos(userId) {
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";

    try {
        const response = await fetch(`http://localhost:8080/api/hospedaje/usuario/${userId}`);
        if (!response.ok) throw new Error("Error al obtener alojamientos");

        const alojamientos = await response.json();

        alojamientos.forEach(hosp => {
            const card = document.createElement("div");
            card.classList.add("card");

            const imagen = hosp.imagen ? hosp.imagen : "../img/fotos alojamiento/default.jpg";

            card.innerHTML = `
                <img src="${imagen}" alt="">
                <div class="overlay">
                    <a href="EditarAlojamiento.html?id=${hosp.id}">
                        <button class="btn edit">Editar alojamiento</button>
                    </a>
                    <button class="btn delete" onclick="eliminarAlojamiento(${hosp.id})">Eliminar alojamiento</button>
                </div>
                <div class="card-body">
                    <h3>${hosp.nombre}</h3>
                    <p>${hosp.direccion}</p>
                </div>
            `;

            cardsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error cargando alojamientos:", error);
    }
}

async function cargarReservas(userId) {
    try {
        const response = await fetch(`http://localhost:8080/api/reserva/usuario/${userId}`);
        if (!response.ok) throw new Error("Error al obtener reservas");

        const reservas = await response.json();

        const eventos = reservas.map(res => ({
            title: `${res.hospedaje.nombre} - Ocupado`,
            start: res.fechaCheckIn,
            end: res.fechaCheckOut,
            color: "#f7b57a"
        }));

        cargarCalendario(eventos);

    } catch (error) {
        console.error("Error cargando reservas:", error);
    }
}

function cargarCalendario(eventos) {
    const calendarEl = document.getElementById("calendar");

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        locale: "es",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        events: eventos
    });

    calendar.render();
}

async function eliminarAlojamiento(id) {
    if (!confirm("¿Seguro que deseas eliminar este alojamiento?")) return;

    try {
        const response = await fetch(`http://localhost:8080/api/hospedaje/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Alojamiento eliminado correctamente");
            location.reload();
        } else {
            alert("No se pudo eliminar el alojamiento");
        }

    } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error de conexión");
    }
}
