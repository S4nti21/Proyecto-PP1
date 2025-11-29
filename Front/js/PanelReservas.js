document.addEventListener("DOMContentLoaded", async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;

    const calendarEl = document.getElementById("calendar");

    async function obtenerReservas() {
        const resp = await fetch(`http://localhost:8080/api/reserva/huesped/${usuario.id}`);
        const data = await resp.json();

        return data.map(r => ({
            id: r.id,
            title: r.hospedaje?.nombre || "Reserva",
            start: r.fechaCheckIn,
            end: r.fechaCheckOut,
            allDay: true,
            extendedProps: {
                hospedaje: r.hospedaje?.nombre,
                checkIn: r.fechaCheckIn,
                checkOut: r.fechaCheckOut
            }
        }));
    }

    let eventos = await obtenerReservas();

    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        locale: "es",
        height: "auto",
        events: eventos,

        eventClick: function (info) {
            abrirModalReserva(info.event);
        }
    });

    calendar.render();
    const modal = document.createElement("div");
    modal.id = "modalReserva";
    modal.style.display = "none";
    modal.classList.add("modal-reserva");
    document.body.appendChild(modal);

    modal.innerHTML = `
        <div class="modal-content-reserva">
            <h2>Reserva</h2>
            <p><strong>Alojamiento:</strong> <span id="modalHospedaje"></span></p>
            
            <label>Check-in:</label>
            <input type="datetime-local" id="modalCheckIn">

            <label>Check-out:</label>
            <input type="datetime-local" id="modalCheckOut">

            <div class="modal-buttons">
                <button id="btnGuardar">Guardar cambios</button>
                <button id="btnEliminar">Eliminar</button>
                <button id="btnCerrar">Cerrar</button>
            </div>
        </div>
    `;

    const modalHospedaje = document.getElementById("modalHospedaje");
    const modalCheckIn = document.getElementById("modalCheckIn");
    const modalCheckOut = document.getElementById("modalCheckOut");
    const btnGuardar = document.getElementById("btnGuardar");
    const btnEliminar = document.getElementById("btnEliminar");
    const btnCerrar = document.getElementById("btnCerrar");

    let reservaActual = null;

    function abrirModalReserva(event) {
        reservaActual = event;

        modalHospedaje.textContent = event.extendedProps.hospedaje;
        modalCheckIn.value = event.extendedProps.checkIn.replace(" ", "T");
        modalCheckOut.value = event.extendedProps.checkOut.replace(" ", "T");

        modal.style.display = "flex";
    }

    btnCerrar.onclick = () => {
        modal.style.display = "none";
    };
    btnGuardar.onclick = async () => {
        const payload = {
            fechaCheckIn: modalCheckIn.value,
            fechaCheckOut: modalCheckOut.value,
            usuario: { id: usuario.id },
        };

        const resp = await fetch(`http://localhost:8080/api/reserva/${reservaActual.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (resp.ok) {
            alert("Reserva actualizada correctamente");

            // Actualizar calendario
            eventos = await obtenerReservas();
            calendar.removeAllEvents();
            calendar.addEventSource(eventos);

            modal.style.display = "none";
        } else {
            alert("Error al actualizar la reserva");
        }
    };
    btnEliminar.onclick = async () => {
        if (!confirm("¿Deseas eliminar la reserva?")) return;

        const resp = await fetch(`http://localhost:8080/api/reserva/${reservaActual.id}`, {
            method: "DELETE"
        });

        if (resp.ok) {
            alert("Reserva eliminada");
            eventos = await obtenerReservas();
            calendar.removeAllEvents();
            calendar.addEventSource(eventos);

            modal.style.display = "none";
        } else {
            alert("Error al eliminar la reserva");
        }
    };
});
