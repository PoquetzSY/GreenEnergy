import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const projectsCollection = collection(db, 'Proyectos');
const formulario = document.getElementById('miFormulario');
formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const heroImage = document.getElementById('heroImage').value;
    const thumbnailImage = document.getElementById('thumbnailImage').value;
    const legend = document.getElementById('legend').value;
    const title = document.getElementById('title').value;
    const moreinfo = document.getElementById('moreinfo').value;
    const contentOne = document.getElementById('contentOne').value;
    const contentTwo = document.getElementById('contentTwo').value;
    const subtitle = document.getElementById('subtitle').value;
    const subcontent = document.getElementById('subcontent').value;
    const date = document.getElementById('date').value;
    const estado = document.getElementById('estado').value;

    try {
        const docRef = await addDoc(projectsCollection, {
            name: name,
            images: [
                {
                    hero: heroImage,
                    imgp: thumbnailImage
                }
            ],
            legend: legend,
            title: title,
            moreinfo: moreinfo,
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
        
        formulario.reset();
    } catch (e) {
        console.error("Error al agregar el documento: ", e);
    }
});