import { calcularHuella, reiniciarFormulario } from '/assets/js/calculadora.js';
import { loadServices } from './services.js';

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
    if (linkname === '/index.html') {
        loadServices('/assets/json/services.json', 8);
        console.log('Estás en el HOME.');
    } else {
        loadServices('/assets/json/services.json');
        console.log('No estás en el HOME.');
    }
    
});


document.getElementById("btnCalcular").addEventListener("click", () => {
    calcularHuella();
});

document.getElementById("btnReset").addEventListener("click", () => {
    reiniciarFormulario();
});