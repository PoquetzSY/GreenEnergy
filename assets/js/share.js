import { calcularHuellaDia, obtenerRespuestas, reiniciarFormulario } from '/assets/js/calculadora.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { db } from './firebase.js';

export function iniciarCompartirHuella() {
    const btnCompartirHuella = document.getElementById("btnCompartirHuella");
    btnCompartirHuella.addEventListener("click", () => {
        document.getElementById("formCompartirHuella").style.display = "block"
        document.getElementById("share-h5").style.display = "block"
        document.getElementById("calculator").style.display = "none"
        document.getElementById("btnCalcular").style.display = "none"
        document.getElementById("exampleModalLabel").style.display = "none"
    });
    const estados = ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
    ];
    const selectEstado = document.getElementById("estado");
    estados.forEach((estado) => {
        const opcion = document.createElement("option");
        opcion.value = estado; // Puedes usar el mismo valor que el texto
        opcion.textContent = estado;
        selectEstado.appendChild(opcion);
    });
    const formCompartirHuella = document.getElementById("formCompartirHuella");
    formCompartirHuella.addEventListener("submit", (event) => {
        event.preventDefault();
        const respuestas = obtenerRespuestas(); 
        const huellaCarbonoDia = calcularHuellaDia(respuestas);

        const estadoSeleccionado = document.getElementById("estado").value;

        enviarDatosAFirebase(huellaCarbonoDia, estadoSeleccionado);

        reiniciarFormulario();
    });
}
const huellasCollection = collection(db, 'huellas');
export async function enviarDatosAFirebase(huellaCarbonoDia, estadoSeleccionado) {

    try {
        const docRef = await addDoc(huellasCollection, {
            huellaCarbono: huellaCarbonoDia,
            estado: estadoSeleccionado,
        });
        console.log('Datos enviados correctamente a Firebase: ', docRef.id);
    } catch (error) {
        console.error('Error al enviar datos a Firebase:', error);
    }
}

