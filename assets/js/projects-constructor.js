document.addEventListener("DOMContentLoaded", () => {
    const proyectoTituloHero = document.getElementById("proyecto-title-hero");
    const proyectoTitulo = document.getElementById("proyecto-title");
    const proyectoNombre = document.getElementById("proyecto-nombre");
    const proyectoURL = document.getElementById("proyecto-url");
    const proyectoImagenHero = document.getElementById("proyecto-imagen-hero");
    const proyectoImagenPrincipal = document.getElementById("proyecto-imagen-principal");
    const proyectoLegend = document.getElementById("proyecto-legend");
    const proyectoMasInfo = document.getElementById("proyecto-masinfo");
    const proyectoContenido1 = document.getElementById("proyecto-contenido1");
    const proyectoContenido2 = document.getElementById("proyecto-contenido2");
    const proyectoSubtitulo = document.getElementById("proyecto-subtitulo");
    const proyectoSubcontenido = document.getElementById("proyecto-subcontenido");
    const proyectoFecha = document.getElementById("proyecto-fecha");
    const proyectoEstado = document.getElementById("proyecto-estado");

    cargarDatosProyectos(archivoJSON)
        .then((data) => {
            const params = new URLSearchParams(window.location.search);
            const proyectoNombreCodificado = params.get("proyecto");

            // Decodifica el nombre del proyecto desde la URL
            const proyectoNombreId = decodeURIComponent(proyectoNombreCodificado);

            const proyecto = data.projects.find((p) => p.name === proyectoNombreId);

            if (proyecto) {
                proyectoTituloHero.textContent = proyecto.title;
                proyectoTitulo.textContent = proyecto.title;
                proyectoNombre.textContent = proyecto.name;
                proyectoURL.textContent = proyecto.name;
                proyectoFecha.textContent = proyecto.date;
                proyectoEstado.textContent = proyecto.estado;
                proyectoImagenHero.style.backgroundImage = `url('${proyecto.images[0].hero}')`;
                proyectoImagenPrincipal.src = proyecto.images[0].imgp;
                proyectoLegend.textContent = proyecto.legend;
                proyectoMasInfo.textContent = proyecto.moreinfo;
                proyectoContenido1.textContent = proyecto.content[0].one;
                proyectoContenido2.textContent = proyecto.content[0].two;
                proyectoSubtitulo.textContent = proyecto.subtitle;
                proyectoSubcontenido.textContent = proyecto.subcontent;
            }
        })
        .catch((error) => {
            console.error("Error al cargar los datos:", error);
        });
});

async function cargarDatosProyectos(archivoJSON) {
    try {
        const response = await fetch(archivoJSON);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}
archivoJSON = '/assets/json/projects.json'