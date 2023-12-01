import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const huellasCollection = collection(db, 'huellas');
const listaElemento = document.getElementById('miLista');
const sumasPorEstado = new Map();
const contadorPorEstado = new Map();

document.addEventListener('DOMContentLoaded', async () => {
    listaElemento.innerHTML = '';

    const querySnapshot = await getDocs(huellasCollection);

    querySnapshot.forEach((doc) => {
        const datos = doc.data();
        const estado = datos.estado;
        const huellaCarbono = parseFloat(datos.huellaCarbono);

        if (sumasPorEstado.has(estado)) {
            sumasPorEstado.set(estado, sumasPorEstado.get(estado) + huellaCarbono);
            contadorPorEstado.set(estado, contadorPorEstado.get(estado) + 1);
        } else {
            sumasPorEstado.set(estado, huellaCarbono);
            contadorPorEstado.set(estado, 1);
        }
    });

    const sumasOrdenadas = new Map([...sumasPorEstado.entries()].sort((a, b) => b[1] - a[1]));

    sumasOrdenadas.forEach((suma, estado) => {
        const contador = contadorPorEstado.get(estado);
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'listaHuellas');
        listItem.innerHTML = `
            <div class="ms-2 me-auto">
                <div class="fw-bold">${estado}</div>
                <p>Impacto Total: ${suma.toFixed(2)} Toneladas de CO2</p>
            </div>
            <p class="mx-2">Huellas registradas</p>
            <span class="badge rounded-pill counter">${contador}</span>
        `;

        listaElemento.appendChild(listItem);
    });
});