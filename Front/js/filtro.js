// ----------------------
// Abrir / cerrar menú
// ----------------------
const filtroBtn = document.getElementById("filtroBtn");
const filtroMenu = document.getElementById("filtroMenu");

filtroBtn.addEventListener("click", () => {
    filtroMenu.classList.toggle("show");
});

window.addEventListener("click", (e) => {
    if (!filtroBtn.contains(e.target) && !filtroMenu.contains(e.target)) {
        filtroMenu.classList.remove("show");
    }
});

// ----------------------
// Filtrar hospedajes
// ----------------------
document.querySelectorAll(".filtro-item").forEach(item => {
    item.addEventListener("click", async () => {

        const tipo = item.textContent.trim();

        // Mostrar todos
        if (tipo === "Mostrar todos") {
            filtroMenu.classList.remove("show"); // cerrar menú
            return cargarHospedajes();
        }

        // Obtener hospedajes desde el API
        const hospedajes = await getHospedajes();

        // Filtrar por tipo
        const filtrados = hospedajes.filter(h =>
            h.tipoHospedaje?.nombre?.toLowerCase() === tipo.toLowerCase()
        );

        // Pintar resultados
        pintarCards(filtrados);

        // Cerrar menú
        filtroMenu.classList.remove("show");
    });
});

// ----------------------
// Pintar cards filtradas
// ----------------------
function pintarCards(lista) {
    const contenedor = document.querySelector(".grid-container");
    contenedor.innerHTML = "";

    lista.forEach(h => {
        const card = document.createElement("a");
        card.href = "Alojamiento.html?id=" + h.id;
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
