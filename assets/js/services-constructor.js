document.addEventListener("DOMContentLoaded", () => {
    const servicioTitulo = document.getElementById("servicio-title");
    const servicioNombre = document.getElementById("servicio-nombre");
    const servicioImagenPrin = document.getElementById("servicio-imagen-principal");
    const servicioImagenSec = document.getElementById("servicio-imagen-secundaria");
    const servicioContenido1 = document.getElementById("servicio-contenido1");
    const servicioSubtitulo1 = document.getElementById("servicio-subtitulo1");
    const servicioSubcontenido1 = document.getElementById("servicio-subcontenido1");
    const servicioServicio1 = document.getElementById("servicio-servicio1");
    const servicioServicio2 = document.getElementById("servicio-servicio2");
    const servicioServicio3 = document.getElementById("servicio-servicio3");
    const servicioContacto = document.getElementById("servicio-contacto");
    const servicioEnlaceHome = document.getElementById("enlace-home");
    const servicioEnlaceContacto = document.getElementById("enlace-contacto");

    cargarDatosServicios(archivoJSON)
        .then((data) => {
            const params = new URLSearchParams(window.location.search);
            const servicioNombreCodificado = params.get("servicio");

            // Decodifica el nombre del servicio desde la URL
            const servicioNombreId = decodeURIComponent(servicioNombreCodificado);

            const servicio = data.services.find((s) => s.name === servicioNombreId);

            if (servicio) {
                servicioTitulo.textContent = servicio.title;
                servicioNombre.textContent = servicio.name;
                document.querySelector('.bg-image').style.backgroundImage = `url('${servicio.images[0].hero}')`;
                servicioImagenPrin.src = servicio.images[0].imgp;
                servicioImagenSec.src = servicio.images[0].subimage;
                servicioContenido1.textContent = servicio.content;
                servicioSubtitulo1.textContent = servicio.subtitle;
                servicioSubcontenido1.textContent = servicio.subcontent;
                servicioServicio1.textContent = servicio.servicios[0].first;
                servicioServicio2.textContent = servicio.servicios[0].second;
                servicioServicio3.textContent = servicio.servicios[0].third;
                servicioContacto.textContent = servicio.contact;
                servicioEnlaceHome.href = servicio.links[0].home;
                servicioEnlaceContacto.href = servicio.links[0].contact;
            }
        })
        .catch((error) => {
            console.error("Error al cargar los datos:", error);
        });
});

async function cargarDatosServicios(archivoJSON) {
    try {
        const response = await fetch(archivoJSON);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}
archivoJSON = '/assets/json/services.json'