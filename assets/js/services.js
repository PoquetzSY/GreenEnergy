export async function loadServices(archivoJSON, limit) {
    try {
        const response = await fetch(archivoJSON);
        const jsonData = await response.json();

        mostrarServicios(jsonData, limit);
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}

function mostrarServicios(data, limit = Infinity) {
    const container = document.getElementById("catalogContainer");

    const serviciosMostrados = Math.min(limit, data.services.length);

    for (let i = 0; i < serviciosMostrados; i++) {
        const service = data.services[i];
        const nombreCodificado = encodeURIComponent(service.name);
        const cardCol = document.createElement('div');
        cardCol.classList.add('col-3', 'd-flex', 'justify-content-center');
        cardCol.innerHTML = `
            <div class="card mt-4">
                <img class="card-img-top" src="${service.images[0].hero}" alt="${service.name}" height="137px">
                <div class="card-body text-start">
                    <div class="d-flex">
                        <i class="bi bi-dash" style="color: #9acc77;"></i>
                        <h6 style="color: #9acc77;">Servicios</h6>
                    </div>
                    <h3>${service.name}</h3>
                    <a href="/view/services-page.html?servicio=${nombreCodificado}" class="btn btn-outline-success">Ver más</a>
                </div>
            </div>
        `;
        container.appendChild(cardCol);
    }
}