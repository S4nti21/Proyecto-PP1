document.addEventListener("DOMContentLoaded", async () => {
    cargarHospedajes();
    mostrarUsuarioEnHeader();
});
async function getHospedajes() {
    try {
        const response = await fetch("http://localhost:8080/api/hospedaje");
        return await response.json();
    } catch (error) {
        console.error("Error en getHospedajes:", error);
        return [];
    }
}
async function cargarHospedajes() {
    try {
        const data = await getHospedajes();
        pintarCards(data);
    } catch (error) {
        console.error("Error al cargar hospedajes:", error);
    }
}

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
                <p>${h.tipoHospedaje?.nombre || "Sin tipo"}</p>
                <p class="precio">$${h.precio_por_noche} <span>Noche</span></p>
            </div>
        `;
        contenedor.appendChild(card);
    });
}
