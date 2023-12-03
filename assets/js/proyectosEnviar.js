import { ProjectsService } from "./services/projectsS.js";

const formulario = document.getElementById('projectsForm');
const formularioEdit = document.getElementById('projectsFormEdit');
const ProjectsContainer = document.getElementById('showProjects')
let id = ""
    
window.addEventListener('DOMContentLoaded', async () => {
    ProjectsService.onGetProjects((querySnapshot) => {
        let html = "";

        querySnapshot.forEach(doc => {
            const project = doc.data()
            html += `
                <li class="list-group-item d-flex justify-content-between">
                    <p style="padding-left: 10px;">${project.title}</p>
                    <div>
                        <button class="btnDelete btn btn-danger" data-id="${doc.id}"><i class="bi bi-trash3-fill"></i></button>
                        <button type="button" class="btnEdit btn btn-warning" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-pencil-square"></i></button>
                    </div>
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

                projectsFormEdit['name'].value = project.name;
                projectsFormEdit['heroImage'].value = project.images[0].hero;
                projectsFormEdit['thumbnailImage'].value = project.images[0].imgp;
                projectsFormEdit['legend'].value = project.legend;
                projectsFormEdit['title'].value = project.title;
                projectsFormEdit['moreinfo'].value = project.moreinfo;
                projectsFormEdit['contentOne'].value = project.content[0].one;
                projectsFormEdit['contentTwo'].value = project.content[0].two;
                projectsFormEdit['subtitle'].value = project.subtitle;
                projectsFormEdit['subcontent'].value = project.subcontent;
                projectsFormEdit['date'].value = project.date;
                projectsFormEdit['estado'].value = project.estado;

                id = doc.id
                console.log(id)
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
        await ProjectsService.createProjects(name, heroImage, thumbnailImage, legend, title, moreinfo, contentOne, contentTwo, subtitle, subcontent, date, estado);
        formulario.reset();
    } catch (e) {
        console.error("Error al agregar el documento: ", e);
    }
});

document.getElementById('btnEdit').addEventListener('click', async (event) => {
    event.preventDefault();

    const name = projectsFormEdit['name'].value;
    const heroImage = projectsFormEdit['heroImage'].value;
    const thumbnailImage = projectsFormEdit['thumbnailImage'].value;
    const legend = projectsFormEdit['legend'].value;
    const title = projectsFormEdit['title'].value;
    const moreinfo = projectsFormEdit['moreinfo'].value;
    const contentOne = projectsFormEdit['contentOne'].value;
    const contentTwo = projectsFormEdit['contentTwo'].value;
    const subtitle = projectsFormEdit['subtitle'].value;
    const subcontent = projectsFormEdit['subcontent'].value;
    const date = projectsFormEdit['date'].value;
    const estado = projectsFormEdit['estado'].value;

    try {
        await ProjectsService.updateProject(id, { name, heroImage, thumbnailImage, legend, title, moreinfo, contentOne, contentTwo, subtitle, subcontent, date, estado });
        formularioEdit.reset();
    } catch (e) {
        console.error("Error al actualizar el documento: ", e);
    }
});

document.getElementById('btnReset').addEventListener('click', () =>{
    formularioEdit.reset()
})