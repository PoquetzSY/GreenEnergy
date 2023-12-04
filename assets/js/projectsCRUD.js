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
                <li class="list-group-item d-flex justify-content-between mt-3">
                    <p style="padding-left: 10px;">${project.name}</p>
                    <div>
                        <button class="btnDelete btn btn-danger" data-id="${doc.id}">Borrar</button>
                        <button type="button" class="btnEdit btn btn-warning" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
                    </div>
                </li>
            `;
        });
        ProjectsContainer.innerHTML = html;

        const btn_Delete = ProjectsContainer.querySelectorAll('.btnDelete');
        btn_Delete.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                ProjectsService.deleteProjects(dataset.id);
                console.log('Documento eliminado exitosamente')
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
    const estado = projectsForm['estado'].value;
    if (
        name.trim() === '' ||
        heroImage.trim() === '' ||
        thumbnailImage.trim() === '' ||
        legend.trim() === '' ||
        title.trim() === '' ||
        moreinfo.trim() === '' ||
        contentOne.trim() === '' ||
        contentTwo.trim() === '' ||
        subtitle.trim() === '' ||
        subcontent.trim() === '' ||
        estado.trim() === ''
    ) {
        alert('Por favor, complete todos los campos.');
    } else {
        try {
            await ProjectsService.createProjects(name, heroImage, thumbnailImage, legend, title, moreinfo, contentOne, contentTwo, subtitle, subcontent, estado);
            formulario.reset();
            console.log('Documento agregado exitosamente')
        } catch (e) {
            console.error("Error al agregar el documento: ", e);
        }
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
    const estado = projectsFormEdit['estado'].value;
    if (
        name.trim() === '' ||
        heroImage.trim() === '' ||
        thumbnailImage.trim() === '' ||
        legend.trim() === '' ||
        title.trim() === '' ||
        moreinfo.trim() === '' ||
        contentOne.trim() === '' ||
        contentTwo.trim() === '' ||
        subtitle.trim() === '' ||
        subcontent.trim() === '' ||
        estado.trim() === ''
    ) {
        alert('Por favor, complete todos los campos.');
    } else {
        try {
            await ProjectsService.updateProject(id, { name, heroImage, thumbnailImage, legend, title, moreinfo, contentOne, contentTwo, subtitle, subcontent, estado });
            formularioEdit.reset();
            console.log('Documento actualizado correctamente')
        } catch (e) {
            console.error("Error al actualizar el documento: ", e);
        }
    }
});

document.getElementById('btnReset').addEventListener('click', () =>{
    formularioEdit.reset()
})