document.addEventListener("DOMContentLoaded", async () => {
    cargarHospedajes();
    mostrarUsuarioEnHeader();
});

// --------------------------------
// TRAER HOSPEDAJES DEL BACK
// --------------------------------
async function cargarHospedajes() {
    try {
        const response = await fetch("http://localhost:8080/api/hospedaje");
        const data = await response.json();
        pintarCards(data);
    } catch (error) {
        console.error("Error al cargar hospedajes:", error);
    }
}

// --------------------------------
// DIBUJAR CARDS
// --------------------------------
function pintarCards(lista) {
    const contenedor = document.getElementById("listaHospedajes");
    contenedor.innerHTML = "";

    lista.forEach(h => {
        const card = document.createElement("a");
        card.href = `Alojamiento.html?id=${h.id}`;
        card.classList.add("card");

        card.innerHTML = `
            <img src="${h.imagen}">
            <div class="card-content">
                <h3>${h.nombre}</h3>
                <p>${h.descripcion}</p>
                <p class="precio">$${h.precio_por_noche} <span>Noche</span></p>
            </div>
        `;
        contenedor.appendChild(card);
    });
}
