const navAuth = document.getElementById("navAuth");
const navUser = document.getElementById("navUser");
const perfilBtn = document.getElementById("perfilBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const cerrarSesion = document.getElementById("cerrarSesion");
const PanelAnfi = document.getElementById("PanelAnfi");
const PanelReserva = document.getElementById("PanelReserva");
const userName = document.getElementById("userName");


function cargarHeader() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        navAuth.classList.remove("oculto");
        navUser.classList.add("oculto");
        PanelAnfi.style.display = "none";
        PanelReserva.style.display = "none";
        return;
    }

    navAuth.classList.add("oculto");
    navUser.classList.remove("oculto");

    userName.textContent = usuario.nombre;

    if (usuario.rol === "ANFITRION") {
        PanelAnfi.style.display = "block";
        PanelReserva.style.display = "none";   
    } else if (usuario.rol === "HUESPED") {
        PanelAnfi.style.display = "none";
        PanelReserva.style.display = "block";  
    }
}


cargarHeader();

perfilBtn.addEventListener("click", () => {
    dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (e) => {
    if (!perfilBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.style.display = "none";
    }
});

cerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuario");

    navUser.classList.add("oculto");
    navAuth.classList.remove("oculto");

    dropdownMenu.style.display = "none";
    PanelAnfi.style.display = "none";

    window.location.href = "index.html";
});
