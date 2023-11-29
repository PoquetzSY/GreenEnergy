import { calcularHuellaDia, obtenerRespuestas, reiniciarFormulario } from '/assets/js/calculadora.js';

export function iniciarCompartirHuella() {
    // Agrega el evento click al botón "Compartir Huella"

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

    // Agrega opciones al select desde el arreglo
    estados.forEach((estado) => {
        const opcion = document.createElement("option");
        opcion.value = estado; // Puedes usar el mismo valor que el texto
        opcion.textContent = estado;
        selectEstado.appendChild(opcion);
    });
    // Agrega el evento submit al formulario
    const formCompartirHuella = document.getElementById("formCompartirHuella");
    formCompartirHuella.addEventListener("submit", (event) => {
        event.preventDefault();
        inicializarFirebase()
        const respuestas = obtenerRespuestas();
        const huellaCarbonoDia = calcularHuellaDia(respuestas);

        const estadoSeleccionado = document.getElementById("estado").value;

        enviarDatosAFirebase(huellaCarbonoDia, estadoSeleccionado);

        reiniciarFormulario();
    });
}
let firebaseApp;
export function inicializarFirebase() {
    if (!firebase.apps.length) {
        const firebaseConfig = {
            apiKey: "AIzaSyCJVzsoV9P7JtheTAuFohRoBZIgwFkYzm0",
            authDomain: "greenenergy-5d9ae.firebaseapp.com",
            projectId: "greenenergy-5d9ae",
            storageBucket: "greenenergy-5d9ae.appspot.com",
            messagingSenderId: "1016617479815",
            appId: "1:1016617479815:web:10be57128ee6e92258d222"
        };
        firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
        firebaseApp = firebase.apps[0];
    }
}
// Función para enviar datos a Firebase
export async function enviarDatosAFirebase(huellaCarbonoDia, estadoSeleccionado) {
    const db = firebaseApp.firestore();
    
    try {
        // Aquí puedes enviar los datos a tu base de datos de Firebase
        await db.collection('huellas').add({
            huellaCarbono: huellaCarbonoDia,
            estado: estadoSeleccionado,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Datos enviados correctamente a Firebase');
    } catch (error) {
        console.error('Error al enviar datos a Firebase:', error);
    }
}
