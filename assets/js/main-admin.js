function cargarComponente(url, contenedor) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            contenedor.innerHTML = data;
        })
        .catch(error => {
            console.error(`Error al cargar el componente desde ${url}:`, error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.createElement('header');
    cargarComponente('/components/header-admin.html', headerContainer);

    document.body.insertBefore(headerContainer, document.body.firstChild);
});