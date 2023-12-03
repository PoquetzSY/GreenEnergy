import { ServicesService } from "./services/servicesS.js";

const formulario = document.getElementById('servicesForm');
const formularioEdit = document.getElementById('servicesFormEdit');
const servicesContainer = document.getElementById('showServices')
let id = ""
    
window.addEventListener('DOMContentLoaded', async () => {
    ServicesService.onGetServices((querySnapshot) => {
        let html = "";

        querySnapshot.forEach(doc => {
            const service = doc.data()
            html += `
                <li class="list-group-item d-flex justify-content-between mt-3">
                    <p style="padding-left: 10px;">${service.name}</p>
                    <div>
                        <button class="btnDelete btn btn-danger" data-id="${doc.id}">Borrar</button>
                        <button type="button" class="btnEdit btn btn-warning" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
                    </div>
                </li>
            `;
        });
        servicesContainer.innerHTML = html;

        const btn_Delete = servicesContainer.querySelectorAll('.btnDelete');
        btn_Delete.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                ServicesService.deleteServices(dataset.id);
            })
        })

        const btn_Edit = servicesContainer.querySelectorAll('.btnEdit');
        btn_Edit.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await ServicesService.getService(e.target.dataset.id)
                const project = doc.data()

                servicesFormEdit['name'].value = project.name;
                servicesFormEdit['heroImage'].value = project.images[0].hero;
                servicesFormEdit['thumbnailImage'].value = project.images[0].imgp;
                servicesFormEdit['legend'].value = project.legend;
                servicesFormEdit['title'].value = project.title;
                servicesFormEdit['moreinfo'].value = project.moreinfo;
                servicesFormEdit['contentOne'].value = project.content[0].one;
                servicesFormEdit['contentTwo'].value = project.content[0].two;
                servicesFormEdit['subtitle'].value = project.subtitle;
                servicesFormEdit['subcontent'].value = project.subcontent;
                servicesFormEdit['date'].value = project.date;
                servicesFormEdit['estado'].value = project.estado;

                id = doc.id
                console.log(id)
            })
        })
    })
});

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = servicesForm['name'].value;
    const heroImage = servicesForm['heroImage'].value;
    const thumbnailImage = servicesForm['thumbnailImage'].value;
    const subImage = servicesForm['subImage'].value;
    const title = servicesForm['title'].value;
    const contentP = servicesForm['contentP'].value;
    const subtitle = servicesForm['subtitle'].value;
    const subcontent = servicesForm['subcontent'].value;
    const firstS = servicesForm['firstS'].value;
    const secondS = servicesForm['secondS'].value;
    const thirdS = servicesForm['thirdS'].value;
    const contact = servicesForm['date'].value;
    const home = servicesForm['home'].value;
    const contactLink = servicesForm['contactLink'].value;

    try {
        await ServicesService.createServices(name, heroImage, thumbnailImage, subImage, title, contentP, subtitle, subcontent, firstS, secondS, thirdS, contact, home, contactLink);
        formulario.reset();
    } catch (e) {
        console.error("Error al agregar el documento: ", e);
    }
});

document.getElementById('btnEdit').addEventListener('click', async (event) => {
    event.preventDefault();

    const name = servicesFormEdit['name'].value;
    const heroImage = servicesFormEdit['heroImage'].value;
    const thumbnailImage = servicesFormEdit['thumbnailImage'].value;
    const subImage = servicesFormEdit['subImage'].value;
    const title = servicesFormEdit['title'].value;
    const contentP = servicesFormEdit['contentP'].value;
    const subtitle = servicesFormEdit['subtitle'].value;
    const subcontent = servicesFormEdit['subcontent'].value;
    const firstS = servicesFormEdit['firstS'].value;
    const secondS = servicesFormEdit['secondS'].value;
    const thirdS = servicesFormEdit['thirdS'].value;
    const contact = servicesFormEdit['date'].value;
    const home = servicesFormEdit['home'].value;
    const contactLink = servicesFormEdit['contactLink'].value;

    try {
        await ServicesService.updateService(id, { name, heroImage, thumbnailImage, subImage, title, contentP, subtitle, subcontent, firstS, secondS, thirdS, contact, home, contactLink });
        formularioEdit.reset();
    } catch (e) {
        console.error("Error al actualizar el documento: ", e);
    }
});

document.getElementById('btnReset').addEventListener('click', () =>{
    formularioEdit.reset()
})