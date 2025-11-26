// home.js

document.addEventListener("DOMContentLoaded", async () => {

    mostrarNavSegunSesion();
    await cargarHospedajes();

});

// ----------------------
// Mostrar nav según login
// ----------------------
function mostrarNavSegunSesion() {
    const usuario = obtenerUsuario();
    const navAuth = document.getElementById("navAuth");
    const navUser = document.getElementById("navUser");

    if (usuario) {
        navAuth.classList.add("oculto");
        navUser.classList.remove("oculto");

        document.getElementById("userName").textContent =
            usuario.nombre + " " + usuario.apellido;

        if (usuario.rol !== "ANFITRION") {
            document.getElementById("PanelAnfi").style.display = "none";
        }

    } else {
        navUser.classList.add("oculto");
        navAuth.classList.remove("oculto");
    }
}

// ----------------------
// Cargar hospedajes
// ----------------------
async function cargarHospedajes() {
    const contenedor = document.querySelector(".grid-container");
    contenedor.innerHTML = "";

    const hospedajes = await getHospedajes();

    hospedajes.forEach(h => {
        const card = document.createElement("a");
        card.href = "Alojamiento.html?id=" + h.id;
        card.classList.add("card");

        card.innerHTML = `
            <img src="${h.imagen}" alt="${h.nombre}">
            <div class="card-content">
                <h3>${h.nombre}</h3>
                <p>${h.descripcion}</p>
                <p class="precio">$${h.precio_por_noche} <span>Noche</span></p>
            </div>
        `;

        contenedor.appendChild(card);
    });
}
