export async function mostrarHuellasCarbono() {
    const firebaseConfig = {
        apiKey: "AIzaSyCJVzsoV9P7JtheTAuFohRoBZIgwFkYzm0",
        authDomain: "greenenergy-5d9ae.firebaseapp.com",
        projectId: "greenenergy-5d9ae",
        storageBucket: "greenenergy-5d9ae.appspot.com",
        messagingSenderId: "1016617479815",
        appId: "1:1016617479815:web:c9c5870f198a404758d222",
        measurementId: "G-EF034V3Q9Y"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const huellaCarbonoCollection = db.collection('huellas');

    const estados = new Map();  // Mapa para almacenar los datos sumarizados por estado

    try {
        const querySnapshot = await huellaCarbonoCollection.get();

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const Estado = data.estado;
            const HuellaCarbono = data.huellaCarbono;

            // Si el estado ya existe en el mapa, actualiza los valores, de lo contrario, añádelo
            if (estados.has(Estado)) {
                estados.get(Estado).sumatoria += HuellaCarbono;
                estados.get(Estado).contador += 1;
            } else {
                estados.set(Estado, { sumatoria: HuellaCarbono, contador: 1 });
            }
        });

        // Crear la lista en Bootstrap
        const listaEstados = document.getElementById('listaEstados');
        estados.forEach((value, key) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.innerHTML = `
                <span class="badge bg-primary">${key}</span>
                <span class="badge bg-secondary">${value.sumatoria} (Suma)</span>
                <span class="badge bg-secondary">${value.contador} (Contador)</span>
            `;
            listaEstados.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al obtener los datos de Firebase:', error);
    }
}