// Función para cargar y mostrar los servicios
export async function loadProjects(archivoJSON, limit) {
    try {
        const response = await fetch(archivoJSON);
        const jsonData = await response.json();

        mostrarProyectos(jsonData, limit);
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}

// Función para mostrar los servicios en HTML
function mostrarProyectos(data, limit = Infinity) {
    const container = document.getElementById("projectsContainer");

    const proyectosMostrados = Math.min(limit, data.projects.length);

    for (let i = 0; i < proyectosMostrados; i++) {
        const project = data.projects[i];
        const nombreCodificado = encodeURIComponent(project.name);
        const cardCol = document.createElement('div');
        cardCol.classList.add('col-4', 'd-flex', 'justify-content-center');
        cardCol.innerHTML = `
            <div class="col">
                <div class="container mt-4 pj">
                    <div class="text-start ">
                        <div class="d-flex">
                            <i class="bi bi-dash" style="color: #9acc77;"></i>
                            <h6 style="color: #9acc77;">Proyectos</h6>
                        </div>
                        <h3>${project.name}</h3>
                        <h6>${project.date}</h6>
                        <a href="/view/projects-page.html?proyecto=${nombreCodificado}" class="btn btn-outline-success">Ver más</a>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(cardCol);
    }
}