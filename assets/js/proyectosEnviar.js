import { ProjectsService } from "./firebase.js";

const formulario = document.getElementById('projectsForm');
const ProjectsContainer = document.getElementById('showProjects')
let Status = false;
let id = ""

window.addEventListener('DOMContentLoaded', async () => {

    ProjectsService.onGetProjects((querySnapshot) => {
        let html = "";

        querySnapshot.forEach(doc => {
            const project = doc.data()
            html += `
                <li class="list-group-item d-flex">
                    <h5 style="padding-left: 10px;">${project.name}</h5>
                    <button class="btnDelete" data-id="${doc.id}">Borrar</button>
                    <button class="btnEdit" data-id="${doc.id}">Editar</button>
                </li>
            `;
        });
        ProjectsContainer.innerHTML = html;

        const btn_Delete = ProjectsContainer.querySelectorAll('.btnDelete');
        btn_Delete.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                ProjectsService.deleteProjects(dataset.id);
            })
        })

        const btn_Edit = ProjectsContainer.querySelectorAll('.btnEdit');
        btn_Edit.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await ProjectsService.getProject(e.target.dataset.id)
                const project = doc.data()

                projectsForm['name'].value = project.name;
                projectsForm['heroImage'].value = project.images[0].hero;
                projectsForm['thumbnailImage'].value = project.images[0].imgp;
                projectsForm['legend'].value = project.legend;
                projectsForm['title'].value = project.title;
                projectsForm['moreinfo'].value = project.moreinfo;
                projectsForm['contentOne'].value = project.content[0].one;
                projectsForm['contentTwo'].value = project.content[0].two;
                projectsForm['subtitle'].value = project.subtitle;
                projectsForm['subcontent'].value = project.subcontent;
                projectsForm['date'].value = project.date;
                projectsForm['estado'].value = project.estado;

                Status = true;
                id = doc.id
                if(Status === true){
                    projectsForm['btn_Edit'].innerHTML = 'Editar'
                } else{
                    projectsForm['btn_Edit'].innerHTML = 'Subir'
                }
            })
        })
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
        if (!Status) {
            ProjectsService.createProjects(name, heroImage, thumbnailImage, legend, title, moreinfo, contentOne, contentTwo, subtitle, subcontent, date, estado);
            console.log("Documento agregado exitosamente :D");
        } else {
            ProjectsService.updateProject(id, { name, heroImage, thumbnailImage, legend, title, moreinfo, contentOne, contentTwo, subtitle, subcontent, date, estado });
            Status = false;
        }

        formulario.reset();
    } catch (e) {
        console.error("Error al agregar el documento: ", e);
    }
});