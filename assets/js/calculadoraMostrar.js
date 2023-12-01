import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { firebaseConfig } from "./credentials.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const huellasCollection = collection(db, 'huellas'); // Ajusta el nombre de tu colección

// Obtén la referencia al elemento HTML donde mostrarás la lista
const listaElemento = document.getElementById('miLista');

// Almacena la suma de huellas de carbono por estado
const sumasPorEstado = new Map();
const contadorPorEstado = new Map();

// Agrega un evento para cargar y mostrar los datos al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    // Limpia la lista antes de cargar nuevos datos
    listaElemento.innerHTML = '';

    // Obtiene los documentos de la colección
    const querySnapshot = await getDocs(huellasCollection);

    // Itera sobre los documentos y realiza la suma por estado
    querySnapshot.forEach((doc) => {
        const datos = doc.data();
        const estado = datos.estado;
        const huellaCarbono = parseFloat(datos.huellaCarbono);

        // Realiza la suma por estado
        if (sumasPorEstado.has(estado)) {
            sumasPorEstado.set(estado, sumasPorEstado.get(estado) + huellaCarbono);
            contadorPorEstado.set(estado, contadorPorEstado.get(estado) + 1);
        } else {
            sumasPorEstado.set(estado, huellaCarbono);
            contadorPorEstado.set(estado, 1);
        }
    });

    // Ordena el mapa por la suma de huellas de carbono (de mayor a menor)
    const sumasOrdenadas = new Map([...sumasPorEstado.entries()].sort((a, b) => b[1] - a[1]));

    // Itera sobre el mapa ordenado y muestra la información en la lista
    sumasOrdenadas.forEach((suma, estado) => {
        const contador = contadorPorEstado.get(estado);
        // Crea un elemento de lista y agrega la información
        const listItem = document.createElement('li');
        listItem.textContent = `Estado: ${estado}, Suma de Huellas de Carbono: ${suma.toFixed(2)}, Cantidad de Huellas: ${contador}`;

        // Agrega el elemento de lista al elemento contenedor
        listaElemento.appendChild(listItem);
    });
});