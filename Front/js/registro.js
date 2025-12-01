document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const nombre = document.getElementById("name").value;
        const apellido = document.getElementById("surname").value;
        const contraseña = document.getElementById("password").value;
        const rol = document.getElementById("rol").value;

        const usuario = {
            email: email,
            nombre: nombre,
            apellido: apellido,
            contraseña: contraseña,
            rol: rol
        };

        try {
            const response = await fetch("http://localhost:8080/api/usuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            if (!response.ok) {
                alert("No se pudo crear el usuario");
                return;
            }

            const data = await response.json();
            localStorage.setItem("usuario", JSON.stringify(data));
            window.location.href = "../page/InicioSesion.html";

        } catch (error) {
            console.error(error);
            alert("Error al conectar con el servidor");
        }
    });
});
