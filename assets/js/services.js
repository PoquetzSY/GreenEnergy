import { db } from "./services/firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const servicesCollection = collection(db, 'Servicios');

export async function loadServices(limit) {
    try {
        const querySnapshot = await getDocs(servicesCollection);
        const servicesData = [];

        querySnapshot.forEach((doc) => {
            const service = { id: doc.id, ...doc.data() };
            servicesData.push(service);
        });

        mostrarServicios(servicesData, limit);
    } catch (error) {
        console.error('Error al cargar los servicios desde Firestore:', error);
    }
}

function mostrarServicios(data, limit = Infinity) {
    const container = document.getElementById("catalogContainer");

    const serviciosMostrados = Math.min(limit, data.length);

    for (let i = 0; i < serviciosMostrados; i++) {
        const service = data[i];
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
                    <a href="/view/services-page.html?servicio=${service.id}" class="btn btn-outline-success">Ver más</a>
                </div>
            </div>
        `;
        container.appendChild(cardCol);
    }
}
