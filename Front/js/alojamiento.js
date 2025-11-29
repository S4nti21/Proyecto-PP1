const params = new URLSearchParams(window.location.search);
const hospedajeId = params.get("id");

if (!hospedajeId) {
    alert("No se encontró el alojamiento.");
}

const titulo = document.getElementById("tituloHospedaje");
const descripcionParrafo = document.getElementById("descripcionHospedaje");
const direccionText = document.getElementById("direccionText");
const precioTexto = document.getElementById("precioHospedaje");
const slidesContainer = document.getElementById("imagenesHospedaje");
const listaServiciosDiv = document.getElementById("listaServicios");


const reservaForm = document.querySelector(".Reserva");
const checkIn = document.getElementById("check-in");
const checkOut = document.getElementById("check-out");


function formatPrice(v) {
    if (v == null) return "$0";
    return new Intl.NumberFormat('es-AR').format(v);
}

async function cargarHospedaje() {
    try {
        const response = await fetch(`http://localhost:8080/api/hospedaje/${hospedajeId}`);
        if (!response.ok) throw new Error("Hospedaje no encontrado");
        const h = await response.json();
        titulo.textContent = h.nombre || "Sin nombre";
        descripcionParrafo.textContent = h.descripcion || "Sin descripción disponible.";
        document.getElementById("tipoHospedajeText").textContent =
            h.tipoHospedaje?.nombre || "No especificado";
        direccionText.textContent = h.direccion || "Sin dirección registrada.";
        precioTexto.textContent = `$${formatPrice(h.precio_por_noche)} / Noche`;
        slidesContainer.innerHTML = "";

        let imagenes = [];
        if (Array.isArray(h.imagenes) && h.imagenes.length) imagenes = h.imagenes;
        else if (h.imagen) imagenes = [h.imagen];
        else imagenes = ['../img/fotos alojamiento/default.jpg']; // fallback

        imagenes.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = h.nombre || "Imagen alojamiento";
            slidesContainer.appendChild(img);
        });

        listaServiciosDiv.innerHTML = "";
        if (!h.servicios || h.servicios.length === 0) {
            listaServiciosDiv.innerHTML = `<p style="color:#666">No hay servicios registrados.</p>`;
        } else {
            h.servicios.forEach(s => {
                const nombre = s.nombre || s.descripcion || JSON.stringify(s);
                const p = document.createElement("p");
                p.innerHTML = `<i class='bx bx-check'></i> ${nombre}`;
                listaServiciosDiv.appendChild(p);
            });
        }

    } catch (error) {
        console.error("Error cargando hospedaje:", error);
        alert("Hubo un problema al cargar el alojamiento.");
    }
}

cargarHospedaje();

reservaForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!checkIn.value || !checkOut.value) {
        alert("Seleccioná fecha de entrada y salida.");
        return;
    }
    if (new Date(checkOut.value) <= new Date(checkIn.value)) {
        alert("La fecha de salida debe ser posterior a la fecha de entrada.");
        return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
        alert("Debes iniciar sesión para reservar.");
        return;
    }

    const reservaDTO = {
        usuarioId: usuario.id,
        alojamientoId: parseInt(hospedajeId),
        fechaCheckIn: checkIn.value + "T00:00:00",
        fechaCheckOut: checkOut.value + "T00:00:00"
    };

    try {
        const response = await fetch("http://localhost:8080/api/reserva", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reservaDTO)
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("Respuesta error reserva:", text);
            throw new Error("No se pudo crear la reserva");
        }

        const reservaCreada = await response.json();
        alert("Reserva creada con éxito!");

    } catch (error) {
        console.error("Error:", error);
        alert("Error al crear la reserva");
    }
});
