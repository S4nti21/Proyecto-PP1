const form = document.getElementById("Formulario");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (email.value === "santi@gmail.com" && password.value === "santi12345") {
        alert("Inicio correcto");
    } else {
        alert("Revise el correo o la contraseña");
    }
});