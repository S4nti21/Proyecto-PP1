document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) {
        alert("Debes iniciar sesión");
        window.location.href = "InicioSesion.html";
        return;
    }

    const form = document.querySelector("form");
    const inputImagen = document.querySelector("input[type='file']");

    let imagenBase64 = null;


    inputImagen.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            imagenBase64 = reader.result;
        };
        reader.readAsDataURL(file);
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = form.querySelector("input[name='nombre']").value.trim();
        const tipoId = form.querySelector("select[name='tipo']").value;
        const direccion = form.querySelector("input[name='direccion']").value.trim();
        const precio = form.querySelector("input[name='precio']").value;
        const descripcion = form.querySelector("textarea[name='descripcion']").value;

        const serviciosSeleccionados = [...document.querySelectorAll("input[name='servicios']:checked")]
            .map(s => ({ id: Number(s.value) }));

        if (!nombre || !tipoId || !direccion || !precio || !descripcion) {
            alert("Completa todos los campos");
            return;
        }

        const data = {
            nombre,
            direccion,
            descripcion,
            precio_por_noche: Number(precio),
            imagen: imagenBase64,
            tipoHospedaje: { id: Number(tipoId) },
            servicios: serviciosSeleccionados,
            usuario: { id: user.id }
        };

        console.log("JSON enviado:", data);

        try {
            const response = await fetch("http://localhost:8080/api/hospedaje", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error del servidor:", errorText);
                alert("Error al crear alojamiento");
                return;
            }

            alert("Alojamiento creado correctamente");
            window.location.href = "PanelDeControl.html";

        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor");
        }
    });
});
