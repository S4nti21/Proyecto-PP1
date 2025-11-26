const navAuth = document.getElementById("navAuth");
const navUser = document.getElementById("navUser");
const perfilBtn = document.getElementById("perfilBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const cerrarSesion = document.getElementById("cerrarSesion");
const PanelAnfi = document.getElementById("PanelAnfi");
const userName = document.getElementById("userName");

// ------------------------------
//  Cargar usuario del localStorage
// ------------------------------
function cargarHeader() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        // NO logeado
        navAuth.classList.remove("oculto");
        navUser.classList.add("oculto");
        PanelAnfi.style.display = "none";
        return;
    }

    // SI logeado
    navAuth.classList.add("oculto");
    navUser.classList.remove("oculto");

    // Mostrar nombre
    userName.textContent = usuario.nombre;

    // Mostrar panel solo si es ANFITRION
    if (usuario.rol === "ANFITRION") {
        PanelAnfi.style.display = "block";
    } else {
        PanelAnfi.style.display = "none";
    }
}

cargarHeader();

// ------------------------------
//  Dropdown del perfil
// ------------------------------
perfilBtn.addEventListener("click", () => {
    dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
});

// Cerrar dropdown si clickean afuera
document.addEventListener("click", (e) => {
    if (!perfilBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.style.display = "none";
    }
});

// ------------------------------
//  Cerrar sesión
// ------------------------------
cerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuario");

    // Ocultar usuario y mostrar auth
    navUser.classList.add("oculto");
    navAuth.classList.remove("oculto");

    dropdownMenu.style.display = "none";
    PanelAnfi.style.display = "none";

    // Opcional: redirigir al inicio
    window.location.href = "index.html";
});
