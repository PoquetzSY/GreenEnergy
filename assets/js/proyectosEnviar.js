import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { firebaseConfig } from "./credentials.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const miColeccion = collection(db, 'usuarios');
const formulario = document.getElementById('miFormulario');
formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const heroImage = document.getElementById('heroImage').value;
    const thumbnailImage = document.getElementById('thumbnailImage').value;
    const legend = document.getElementById('legend').value;
    const title = document.getElementById('title').value;
    const contentOne = document.getElementById('contentOne').value;
    const contentTwo = document.getElementById('contentTwo').value;
    const subtitle = document.getElementById('subtitle').value;
    const subcontent = document.getElementById('subcontent').value;
    const date = document.getElementById('date').value;
    const estado = document.getElementById('estado').value;

    try {
        // Agregar documento a la colección
        const docRef = await addDoc(miColeccion, {
            name: name,
            images: [
                {
                    hero: heroImage,
                    imgp: thumbnailImage
                }
            ],
            legend: legend,
            title: title,
            content: [
                {
                    one: contentOne,
                    two: contentTwo
                }
            ],
            subtitle: subtitle,
            subcontent: subcontent,
            date: date,
            estado: estado
        });

        console.log("Documento agregado con ID: ", docRef.id);
        
        // Limpiar formulario después de enviar
        formulario.reset();
    } catch (e) {
        console.error("Error al agregar el documento: ", e);
    }
});