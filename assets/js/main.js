// Header
const headerContainer = document.createElement('header');
fetch('/components/header.html')
    .then(response => response.text())
    .then(data => {
        headerContainer.innerHTML = data;
    })
    .catch(error => {
        console.error('Error al cargar el encabezado:', error);
    });
window.addEventListener('DOMContentLoaded', () => {
    document.body.insertBefore(headerContainer, document.body.firstChild);
});

//Firebase


// //doughnut
// var ctxD = document.getElementById("doughnutChart").getContext('2d');
// var myLineChart = new Chart(ctxD, {
//   type: 'doughnut',
//   data: {
//     labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
//     datasets: [{
//       data: [300, 50, 100, 40, 120],
//       backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
//       hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
//     }]
//   },
//   options: {
//     responsive: true
//   }
// });

//calcyladora
function calcularHuella() {
    const respuestas = obtenerRespuestas();
    const huellaCarbonoDia = calcularHuellaDia(respuestas);
    const huellaMes = huellaCarbonoDia * 30;
    const huellaAnio = huellaMes * 12;

    mostrarResultados(huellaCarbonoDia, huellaMes, huellaAnio);
    mostrarRecomendaciones(huellaCarbonoDia);
}