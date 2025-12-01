document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("Formulario");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const contraseña = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:8080/api/usuario/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    email: email, 
                    contraseña: contraseña
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.mensaje);
                return;
            }

            console.log("Usuario:", data.usuario);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            window.location.href = "Home.html";

        } catch (error) {
            console.error("Error:", error);
            alert("Error al conectar con el servidor");
        }
    });
});
