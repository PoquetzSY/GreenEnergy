import { ProjectsService } from "./firebase.js";

const formulario = document.getElementById('projectsForm');
const ProjectsContainer = document.getElementById('showProjects')

window.addEventListener('DOMContentLoaded', async () =>{

    ProjectsService.onGetProjects((querySnapshot) => {
        let html = "";
    
        querySnapshot.forEach(doc => {
            const project = doc.data()
            html += `
                <li class="list-group-item d-flex">
                    <h5 style="padding-left: 10px;">${project.name}</h5>
                    <button>Borrar</button>
                </li>
            `;
        });
        ProjectsContainer.innerHTML = html;
    })
});

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = projectsForm['name'].value;
    const heroImage = projectsForm['heroImage'].value;
    const thumbnailImage = projectsForm['thumbnailImage'].value;
    const legend = projectsForm['legend'].value;
    const title = projectsForm['title'].value;
    const moreinfo = projectsForm['moreinfo'].value;
    const contentOne = projectsForm['contentOne'].value;
    const contentTwo = projectsForm['contentTwo'].value;
    const subtitle = projectsForm['subtitle'].value;
    const subcontent = projectsForm['subcontent'].value;
    const date = projectsForm['date'].value;
    const estado = projectsForm['estado'].value;

    try {
        ProjectsService.createProjects(name,heroImage,thumbnailImage,legend,title,moreinfo,contentOne,contentTwo,subtitle,subcontent,date,estado)
        console.log("Documento agregado exitosamente :D");
        
        formulario.reset();
    } catch (e) {
        console.error("Error al agregar el documento: ", e);
    }
});