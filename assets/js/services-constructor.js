import { db } from "./services/firebase.js";
import { doc, getDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("serviciosContainer"); // Cambia "serviciosContainer" por el ID de tu contenedor

    const serviciosCollection = collection(db, 'Servicios');

    const urlParams = new URLSearchParams(window.location.search);
    const servicioNombreCodificado = urlParams.get("servicio");
    const servicioNombreId = decodeURIComponent(servicioNombreCodificado);

    try {
        const servicioDocRef = doc(serviciosCollection, servicioNombreId);
        const servicioSnapshot = await getDoc(servicioDocRef);

        if (servicioSnapshot.exists()) {
            const servicioData = servicioSnapshot.data();
            mostrarDetallesServicio(servicioData, container);
        } else {
            console.error('El servicio no existe.');
        }
    } catch (error) {
        console.error('Error al cargar los detalles del servicio:', error);
    }
});

function mostrarDetallesServicio(data, container) {
    const heroSection = document.createElement("div");
    heroSection.classList.add("text-center", "bg-image", "rounded-3");
    heroSection.style.backgroundImage = `url('${data.images[0].hero}')`;
    heroSection.style.backgroundSize = "cover";
    heroSection.style.height = "350px";

    const mask = document.createElement("div");
    mask.classList.add("mask");
    mask.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    mask.style.height = "350px";

    const innerContent = document.createElement("div");
    innerContent.classList.add("d-flex", "justify-content-center", "align-items-center", "h-100");

    const textWhite = document.createElement("div");
    textWhite.classList.add("text-white");

    const h1 = document.createElement("h1");
    h1.classList.add("mb-3");
    h1.textContent = data.name;

    textWhite.appendChild(h1);
    innerContent.appendChild(textWhite);
    mask.appendChild(innerContent);
    heroSection.appendChild(mask);
    container.appendChild(heroSection);

    const rowSection = document.createElement("div");
    rowSection.classList.add("row");

    const col1 = document.createElement("div");
    col1.classList.add("col-6", "col-md-4", "sPart1");
    col1.style.padding = "70px";

    const moreInfo = document.createElement("div");
    moreInfo.classList.add("moreinfo");

    const h4MoreInfo = document.createElement("h4");
    h4MoreInfo.textContent = "Conócelos";

    const pMoreInfo = document.createElement("p");
    pMoreInfo.classList.add("mt-", "minical");
    pMoreInfo.textContent = data.contact;

    const aMoreInfo = document.createElement("a");
    aMoreInfo.classList.add("btn", "btn-outline-success");
    aMoreInfo.id = "enlace-home";
    aMoreInfo.href = data.links[0].home;
    aMoreInfo.textContent = "Ir a su sitio";

    moreInfo.appendChild(h4MoreInfo);
    moreInfo.appendChild(pMoreInfo);
    moreInfo.appendChild(aMoreInfo);

    const contactInfo = document.createElement("div");
    contactInfo.classList.add("contactInfo");
    contactInfo.style.backgroundImage = `url('${data.images[0].subimage}')`;


    const maskInfo = document.createElement("div");
    maskInfo.classList.add("maskInfo");

    const h4ContactInfo = document.createElement("h4");
    h4ContactInfo.classList.add("mt-3");
    h4ContactInfo.textContent = "¿Tienes alguna duda?";

    const pContactInfo = document.createElement("p");
    pContactInfo.classList.add("minical");
    pContactInfo.textContent = "Te facilitamos la comunicación con la empresa para que resuelvas tus dudas";

    const aContactInfo = document.createElement("a");
    aContactInfo.classList.add("btnInfo");
    aContactInfo.id = "enlace-contacto";
    aContactInfo.href = data.links[0].contact;
    aContactInfo.textContent = "Contactarlos";

    maskInfo.appendChild(h4ContactInfo);
    maskInfo.appendChild(pContactInfo);
    maskInfo.appendChild(aContactInfo);
    contactInfo.appendChild(maskInfo);

    col1.appendChild(moreInfo);
    col1.appendChild(contactInfo);
    rowSection.appendChild(col1);

    const col2 = document.createElement("div");
    col2.classList.add("col-12", "col-md-8", "sPart2");

    const contentCenter = document.createElement("div");
    contentCenter.classList.add("d-flex", "justify-content-center");
    contentCenter.style.flexDirection = "column";
    contentCenter.style.padding = "70px";

    const imgPrincipal = document.createElement("img");
    imgPrincipal.src = data.images[0].imgp;
    imgPrincipal.alt = "";
    imgPrincipal.id = "servicio-imagen-principal";

    const h2Title = document.createElement("h2");
    h2Title.id = "servicio-title";
    h2Title.textContent = data.title;

    const pContenido1 = document.createElement("p");
    pContenido1.classList.add("mt-3", "textcal");
    pContenido1.id = "servicio-contenido1";
    pContenido1.textContent = data.content;

    const h5Subtitulo1 = document.createElement("h5");
    h5Subtitulo1.classList.add("textcal");
    h5Subtitulo1.id = "servicio-subtitulo1";
    h5Subtitulo1.textContent = data.subtitle;

    const pSubcontenido1 = document.createElement("p");
    pSubcontenido1.classList.add("textcal");
    pSubcontenido1.id = "servicio-subcontenido1";
    pSubcontenido1.textContent = data.subcontent;

    const rowSubimg = document.createElement("div");
    rowSubimg.classList.add("row", "mt-4", "d-flex");

    const colSubimg1 = document.createElement("div");
    colSubimg1.classList.add("col");

    const imgSecundaria = document.createElement("img");
    imgSecundaria.src = data.images[0].subimage;
    imgSecundaria.alt = "";
    imgSecundaria.id = "servicio-imagen-secundaria";
    imgSecundaria.classList.add("subimg");

    const colSubimg2 = document.createElement("div");
    colSubimg2.classList.add("col");

    const h5Servicios = document.createElement("h5");
    h5Servicios.textContent = "Sus servicios";

    const divServicio1 = document.createElement("div");
    divServicio1.classList.add("d-flex");

    const iServicio1 = document.createElement("i");
    iServicio1.classList.add("bi", "bi-check-circle-fill");

    const pServicio1 = document.createElement("p");
    pServicio1.id = "servicio-servicio1";
    pServicio1.textContent = data.servicios[0].first;


    const divServicio2 = document.createElement("div");
    divServicio2.classList.add("d-flex");

    const iServicio2 = document.createElement("i");
    iServicio2.classList.add("bi", "bi-check-circle-fill");

    const pServicio2 = document.createElement("p");
    pServicio2.id = "servicio-servicio2";
    pServicio2.textContent = data.servicios[0].second;

    const divServicio3 = document.createElement("div");
    divServicio3.classList.add("d-flex");
    divServicio3.id = "third";

    const iServicio3 = document.createElement("i");
    iServicio3.classList.add("bi", "bi-check-circle-fill");

    const pServicio3 = document.createElement("p");
    pServicio3.id = "servicio-servicio3";
    pServicio3.textContent = data.servicios[0].third;

    divServicio1.appendChild(iServicio1);
    divServicio1.appendChild(pServicio1);
    divServicio2.appendChild(iServicio2);
    divServicio2.appendChild(pServicio2);
    divServicio3.appendChild(iServicio3);
    divServicio3.appendChild(pServicio3);

    rowSubimg.appendChild(colSubimg1);
    colSubimg1.appendChild(imgSecundaria);
    rowSubimg.appendChild(colSubimg2);
    colSubimg2.appendChild(h5Servicios);
    colSubimg2.appendChild(divServicio1);
    colSubimg2.appendChild(divServicio2);
    colSubimg2.appendChild(divServicio3);

    contentCenter.appendChild(imgPrincipal);
    contentCenter.appendChild(h2Title);
    contentCenter.appendChild(pContenido1);
    contentCenter.appendChild(h5Subtitulo1);
    contentCenter.appendChild(pSubcontenido1);
    contentCenter.appendChild(rowSubimg);

    col2.appendChild(contentCenter);
    rowSection.appendChild(col2);

    container.appendChild(rowSection);

    if (data.servicios[0].third === " ") {
        document.getElementById("third").style.visibility = "hidden";
        console.log('se oculto correctamente');
    }
}
