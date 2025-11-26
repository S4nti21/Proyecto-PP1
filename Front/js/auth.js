// auth.js

function guardarUsuario(usuario) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
}

function obtenerUsuario() {
    return JSON.parse(localStorage.getItem("usuario"));
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    const cerrarBtn = document.getElementById("cerrarSesion");
    if (cerrarBtn) cerrarBtn.onclick = cerrarSesion;
});
