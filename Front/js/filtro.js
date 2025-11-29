
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

document.querySelectorAll(".filtro-item").forEach(item => {
    item.addEventListener("click", async () => {

        console.log("CLICK EN:", item.textContent);

        const tipo = item.textContent.trim();

        // Mostrar todos
        if (tipo === "Mostrar todos") {
            filtroMenu.classList.remove("show");
            return cargarHospedajes();
        }

       
        const hospedajes = await getHospedajes();

        console.log("HOSPEDAJES:", hospedajes);     

        
        const filtrados = hospedajes.filter(h =>
            h.tipoHospedaje &&
            h.tipoHospedaje.nombre &&
            h.tipoHospedaje.nombre.trim().toLowerCase() === tipo.toLowerCase()
        );

        console.log("FILTRADOS:", filtrados);      
        pintarCards(filtrados);
        filtroMenu.classList.remove("show");
    });
});
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
                <p>${h.tipoHospedaje?.nombre || "Sin tipo"}</p>
                <p class="precio">$${h.precio_por_noche} <span>Noche</span></p>
            </div>
        `;

        contenedor.appendChild(card);
    });
}
