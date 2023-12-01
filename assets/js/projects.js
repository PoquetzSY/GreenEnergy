import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const projectsCollection = collection(db, 'Proyectos');

export async function loadProjects(limit) {
    try {
        const querySnapshot = await getDocs(projectsCollection);
        const projectsData = [];

        querySnapshot.forEach((doc) => {
            const project = { id: doc.id, ...doc.data() };
            projectsData.push(project);
        });

        mostrarProyectos(projectsData, limit);
    } catch (error) {
        console.error('Error al cargar los proyectos desde Firestore:', error);
    }
}

// Función para mostrar los proyectos en HTML
function mostrarProyectos(data, limit = Infinity) {
    const container = document.getElementById("projectsContainer");

    const proyectosMostrados = Math.min(limit, data.length);

    for (let i = 0; i < proyectosMostrados; i++) {
        const project = data[i];
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
                        <a href="/view/projects-page.html?proyecto=${project.id}" class="btn btn-outline-success">Ver más</a>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(cardCol);
    }
}