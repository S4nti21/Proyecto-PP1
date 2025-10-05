const navAuth = document.getElementById("navAuth");
const navUser = document.getElementById("navUser");
const perfilBtn = document.getElementById("perfilBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const cerrarSesion = document.getElementById("cerrarSesion");
const PanelAnfi = document.getElementById("PanelAnfi");

const Rol = "Anfitrion";

if (Rol == "Anfitrion") {
    navAuth.classList.add("oculto");
    navUser.classList.remove("oculto");
}
else if (Rol == "Usuario") {
    navAuth.classList.add("oculto");
    navUser.classList.remove("oculto");
    PanelAnfi.classList.add("dropdown");
}
else {
    navAuth.classList.remove("oculto");
    navUser.classList.add("oculto");
}

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
    navUser.classList.add("oculto");
    navAuth.classList.remove("oculto");
    dropdownMenu.style.display = "none";
});
