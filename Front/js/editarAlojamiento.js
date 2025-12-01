document.addEventListener("DOMContentLoaded", async () => {

    const user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) {
        alert("Debes iniciar sesión");
        window.location.href = "InicioSesion.html";
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const alojamientoId = params.get("id");

    if (!alojamientoId) {
        alert("No se encontró el alojamiento");
        window.location.href = "PanelDeControl.html";
        return;
    }

    const form = document.querySelector("form");
    const inputImagen = document.querySelector("input[type='file']");
    let imagenSeleccionada = null;

    inputImagen.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) imagenSeleccionada = file;
    });

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });
    }
    try {
        const response = await fetch(`http://localhost:8080/api/hospedaje/${alojamientoId}`);
        const alojamiento = await response.json();

        form.querySelector("input[name='nombre']").value = alojamiento.nombre;
        form.querySelector("input[name='direccion']").value = alojamiento.direccion;
        form.querySelector("textarea[name='descripcion']").value = alojamiento.descripcion;

        form.querySelector("select[name='tipo']").value = alojamiento.tipoHospedaje.id;

        const serviciosGuardados = alojamiento.servicios || [];
        document.querySelectorAll("input[name='servicios']").forEach(chk => {
            const idServicio = Number(chk.value);
            if (serviciosGuardados.some(s => s.id === idServicio)) {
                chk.checked = true;
            }
        });

    } catch (err) {
        console.error(err);
        alert("No se pudo cargar el alojamiento");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = form.querySelector("input[name='nombre']").value.trim();
        const tipo = Number(form.querySelector("select[name='tipo']").value);
        const direccion = form.querySelector("input[name='direccion']").value.trim();
        const descripcion = form.querySelector("textarea[name='descripcion']").value.trim();

        const servicios = [...document.querySelectorAll("input[name='servicios']:checked")]
            .map(s => ({ id: Number(s.value) }));
        let imagenBase64 = null;
        if (imagenSeleccionada) {
            imagenBase64 = await fileToBase64(imagenSeleccionada);
        }

        const data = {
            nombre,
            direccion,
            descripcion,
            tipoHospedaje: { id: tipo },
            servicios,
            imagen: imagenBase64
        };

        try {
            const response = await fetch(`http://localhost:8080/api/hospedaje/${alojamientoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error del servidor:", errorText);
                alert("Error al editar alojamiento");
                return;
            }

            alert("Alojamiento editado correctamente");
            window.location.href = "PanelDeControl.html";

        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor");
        }
    });
});
