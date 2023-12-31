import { dashboard } from "./services/dashboardS.js";
import {ManageAccount} from "./auth/authenticate.js"

const headerContainer = document.createElement('header');
const containerh = document.getElementById('huellas');
const containerp = document.getElementById('proyectos');
const containers = document.getElementById('servicios');

function cargarComponente(url, contenedor) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            contenedor.innerHTML = data;
        })
        .catch(error => {
            console.error(`Error al cargar el componente desde ${url}:`, error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarComponente('/components/header-admin.html', headerContainer);

    document.body.insertBefore(headerContainer, document.body.firstChild);
    // Mostrar los últimos documentos de 'huellas'
    dashboard.getLatestDocuments('huellas', (latestDocuments) => {
        renderLatestDocuments('huellas', latestDocuments, containerh);
    });
    dashboard.getLatestDocuments('Proyectos', (latestDocuments) => {
        renderLatestDocuments('Proyectos', latestDocuments, containerp);
    });
    dashboard.getLatestDocuments('Servicios', (latestDocuments) => {
        renderLatestDocuments('Servicios', latestDocuments, containers);
    });

    const linkname = window.location.pathname;
    console.log(linkname)
    if (!linkname === '/view/admin/g-admin.html') {
        document.getElementById("logout").style.display = "block";
        console.log('prueba')
    } else {
        document.getElementById("logout").style.display = "none";
    }
});

// Función para renderizar los datos en el contenedor
function renderLatestDocuments(collectionName, documents, contenedor) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // Agrega un título para la sección
    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = `Últimos documentos de ${collectionName}`;
    let html = "";

    documents.forEach(dato => {
        const fecha = new Date(dato.date.toDate());
        if(collectionName === 'huellas'){
            html += `
            <li class="list-group-item d-flex justify-content-between mt-3">
                <p style="padding-left: 10px;">${dato.huellaCarbono}</p>
                <p>Fecha de registro</p>
                <p>${fecha.toLocaleDateString(undefined, options)}</p>
                <div>
                </div>
            </li>
        `;
        } else{
            html += `
                <li class="list-group-item d-flex justify-content-between mt-3">
                    <p style="padding-left: 10px;">${dato.name}</p>
                    <p>Fecha de registro</p>
                    <p>${fecha.toLocaleDateString(undefined, options)}</p>
                    <div>
                    </div>
                </li>
            `;
        }
    });
    contenedor.innerHTML = html;
}
