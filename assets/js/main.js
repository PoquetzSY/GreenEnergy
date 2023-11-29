import { calcularHuella, reiniciarFormulario } from './calculadora.js';
import { loadServices } from './services.js';
import { loadProjects } from './projects.js';
import { iniciarCompartirHuella } from './share.js';

// Cargar header y footer
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
    
    if (linkname === '/') {
        loadServices('/assets/json/services.json', 8);
        loadProjects('/assets/json/projects.json', 3)
    } else {
        loadServices('/assets/json/services.json');
        loadProjects('/assets/json/projects.json')
    }
    iniciarCompartirHuella();

});


document.getElementById("btnCalcular").addEventListener("click", () => {
    calcularHuella();
});

document.getElementById("btnReset").addEventListener("click", () => {
    reiniciarFormulario();
});