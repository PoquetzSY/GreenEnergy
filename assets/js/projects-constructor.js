import { db } from "./firebase.js";
import { doc, getDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Obtén el ID del proyecto desde la URL
const urlParams = new URLSearchParams(window.location.search);
const proyectoId = urlParams.get('proyecto');

const proyectosCollection = collection(db, 'Proyectos');

// Obtén el documento del proyecto
const proyectoDocRef = doc(proyectosCollection, proyectoId);

(async () => {
    try {
        const proyectoSnapshot = await getDoc(proyectoDocRef);

        if (proyectoSnapshot.exists()) {
            const proyectoData = proyectoSnapshot.data();
            mostrarDetallesProyecto(proyectoData);
        } else {
            console.error('El proyecto no existe.');
        }
    } catch (error) {
        console.error('Error al cargar los detalles del proyecto:', error);
    }
})();

const proyectoDetalleContainer = document.getElementById("projectsDetails");
const proyectoNombre = document.getElementById("proyecto-url");
function mostrarDetallesProyecto(data) {
    
    proyectoNombre.textContent = data.name;
    proyectoDetalleContainer.innerHTML = `
        <div id="proyecto-imagen-hero" class="d-flex container-fluid" lc-helper="background"
            style="height:50vh;background:url(${data.images[0].hero})  center / cover no-repeat;">
        </div>
        <div class="container p-5 bg-light" style="margin-top:-100px">
            <div class="row">
                <div class="col-md-4 text-center align-self-center">
                    <div class="lc-block bordep ">
                        <div editable="rich">
                            <p class="display-4 text-secondary" id="proyecto-estado">${data.estado}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="lc-block ">
                        <div editable="rich">
                            <p class="display-4" id="proyecto-title-hero">${data.title}</p>
                            <p id="proyecto-fecha" class="datep">${data.date}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <div class="lc-block mt-5">
                        <div editable="rich" class="project-text">
                            <p class="display-6" id="proyecto-nombre">${data.name}</p>
                            <em class="italic" id="proyecto-legend">${data.legend}</em>
                            <div class="fact my-4">
                                <p id="proyecto-masinfo">${data.moreinfo}</p>
                            </div>
                            <h3 id="proyecto-title">${data.title}</h3>
                            <img src="${data.images[0].imgp}" alt="" id="proyecto-imagen-principal" class="my-3">
                            <p class="lead text-secondary" id="proyecto-contenido1">${data.content[0].one}</p>
                            <p class="lead text-secondary" id="proyecto-contenido2">${data.content[0].two}</p>
                            <h3 id="proyecto-subtitulo">${data.subtitle}</h3>
                            <p class="lead text-secondary" id="proyecto-subcontenido">${data.subcontent}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
