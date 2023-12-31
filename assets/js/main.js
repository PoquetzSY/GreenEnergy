import { calcularHuella, reiniciarFormulario } from './calculadora.js';
import { loadServices } from './services.js';
import { loadProjects } from './projects.js';
import { iniciarCompartirHuella } from './share.js';

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
    const headerContainer = document.createElement('header');
    const footerContainer = document.createElement('div');
    footerContainer.classList.add('divFooter');

    cargarComponente('/components/header.html', headerContainer);
    cargarComponente('/components/footer.html', footerContainer);

    document.body.insertBefore(headerContainer, document.body.firstChild);
    document.body.appendChild(footerContainer);
    
    const linkname = window.location.pathname;
    console.log(linkname)
    if (linkname === '/') {
        loadServices(4);
        loadProjects(3)
    } else {
        loadServices();
        loadProjects()
    }

    iniciarCompartirHuella();
});


document.getElementById("btnCalcular").addEventListener("click", () => {
    calcularHuella();
});

document.getElementById("btnReset").addEventListener("click", () => {
    reiniciarFormulario();
});