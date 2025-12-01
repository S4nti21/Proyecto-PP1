const form = document.querySelector("form");

const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));

if (!usuarioLogueado) {
    alert("No hay usuario logueado.");
}

document.querySelector("input[name='nombre']").value = usuarioLogueado.nombre || "";
document.querySelector("input[name='apellido']").value = usuarioLogueado.apellido || "";
document.querySelector("input[name='dni']").value = usuarioLogueado.dni || "";

function convertirABase64(file) {
    return new Promise((resolve, reject) => {
        const lector = new FileReader();
        lector.readAsDataURL(file);
        lector.onload = () => resolve(lector.result);
        lector.onerror = error => reject(error);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = form.nombre.value;
    const apellido = form.apellido.value;
    const dni = form.dni.value;

    const imagenInput = document.querySelector("input[type='file']");
    let imagenBase64 = usuarioLogueado.imagen;

    if (imagenInput.files.length > 0) {
        imagenBase64 = await convertirABase64(imagenInput.files[0]);
    }

    const usuarioActualizado = {
        nombre,
        apellido,
        dni,
        imagen: imagenBase64
    };

    try {
        console.log("DATA ENVIADA:", usuarioActualizado);

        const response = await fetch(`http://localhost:8080/api/usuario/${usuarioLogueado.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarioActualizado)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar usuario");
        }

        const data = await response.json();
        localStorage.setItem("usuario", JSON.stringify(data));

        alert("Perfil actualizado correctamente");

    } catch (err) {
        console.error(err);
        alert("No se pudo actualizar el perfil");
    }
});
