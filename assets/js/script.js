// Crea un elemento div para contener el encabezado
const headerContainer = document.createElement('header');

// Utiliza el método fetch para cargar el contenido del encabezado desde header.html
fetch('/view/header.html')
    .then(response => response.text())
    .then(data => {
        headerContainer.innerHTML = data;
    })
    .catch(error => {
        console.error('Error al cargar el encabezado:', error);
    });

// Agrega el encabezado al cuerpo de la página una vez que esté cargado
window.addEventListener('DOMContentLoaded', () => {
    document.body.insertBefore(headerContainer, document.body.firstChild);
});


//doughnut
var ctxD = document.getElementById("doughnutChart").getContext('2d');
var myLineChart = new Chart(ctxD, {
  type: 'doughnut',
  data: {
    labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
    datasets: [{
      data: [300, 50, 100, 40, 120],
      backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
      hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
    }]
  },
  options: {
    responsive: true
  }
});

function calcularHuella() {
  // Obtener los valores seleccionados por el usuario
  const consumoEnergia = document.getElementById("consumoEnergia").value;
  const transporte = document.getElementById("transporte").value;
  const dieta = document.getElementById("dieta").value;

  // Realizar cálculos de huella de carbono (ficticios) en base a las opciones seleccionadas
  let huellaCarbono = 0;

  if (consumoEnergia === "bajo") {
      huellaCarbono += 0.1;
  } else if (consumoEnergia === "medio") {
      huellaCarbono += 0.2;
  } else if (consumoEnergia === "alto") {
      huellaCarbono += 0.3;
  }

  if (transporte === "corto") {
      huellaCarbono += 0.05;
  } else if (transporte === "medio") {
      huellaCarbono += 0.1;
  } else if (transporte === "largo") {
      huellaCarbono += 0.2;
  }

  if (dieta === "pocaCarne") {
      huellaCarbono += 0.1;
  } else if (dieta === "moderadaCarne") {
      huellaCarbono += 0.2;
  } else if (dieta === "muchaCarne") {
      huellaCarbono += 0.3;
  }

  // Calcular la huella de carbono mensual (multiplicar por 30 para un mes)
  const huellaMensual = (huellaCarbono).toFixed(2);

  // Mostrar el resultado
  document.getElementById("resultado").textContent = huellaMensual + " toneladas de CO2";
}