// Función para obtener las respuestas del usuario
function obtenerRespuestas() {
    return {
        electricidadDia: document.getElementById("electricidadDia").value,
        transportePublico: obtenerValorRadio("transportePublico"),
        frecuenciaTransporte: document.getElementById("frecuenciaTransporte").value,
        usoCoche: document.getElementById("usoCoche").value,
        consumoCarne: document.getElementById("consumoCarne").value,
        aireAcondicionado: obtenerValorRadio("aireAcondicionado"),
        numVuelosAnio: document.getElementById("numVuelosAnio").value,
        consumoPlasticoDia: document.getElementById("consumoPlasticoDia").value,
    };
}
function obtenerValorRadio(radiovalue) {
    const radios = document.getElementsByName(radiovalue);
    for (const radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}
// Función para calcular la huella de carbono para un día
function calcularHuellaDia(respuestas) {
    let huellaCarbonoDia = 0;

    // Cálculos ficticios, ajusta según necesidades reales
    switch (respuestas.electricidadDia) {
        case "bajo":
            huellaCarbonoDia += 0.1;
            break;
        case "medio":
            huellaCarbonoDia += 0.2;
            break;
        case "alto":
            huellaCarbonoDia += 0.3;
            break;
        default:
            break;
    }

    if (respuestas.transportePublico === "si") {
        if (respuestas.frecuenciaTransporte === "diario") {
            huellaCarbonoDia += 0.2;
        } else if (respuestas.frecuenciaTransporte === "semanal") {
            huellaCarbonoDia += 0.1;
        } else {
            huellaCarbonoDia += 0.05;
        }
    } else if(respuestas.transportePublico === "no"){
        huellaCarbonoDia += 0;
    }

    switch (respuestas.usoCoche) {
        case "diario":
            huellaCarbonoDia += 0.3;
            break;
        case "semanal":
            huellaCarbonoDia += 0.2;
            break;
        case "ocasional":
            huellaCarbonoDia += 0.1;
            break;
        default:
            break;
    }

    switch (respuestas.consumoCarne) {
        case "poco":
            huellaCarbonoDia += 0.1;
            break;
        case "moderado":
            huellaCarbonoDia += 0.2;
            break;
        case "mucho":
            huellaCarbonoDia += 0.3;
            break;
        default:
            break;
    }

    if (respuestas.aireAcondicionado === "si") {
        huellaCarbonoDia += 0.2;
    } else if(respuestas.aireAcondicionado === "no") {
        huellaCarbonoDia += 0;
    }

    switch (respuestas.numVuelosAnio) {
        case "ninguno":
            huellaCarbonoDia += 0;
            break;
        case "1-3":
            huellaCarbonoDia += 0.5;
            break;
        case "4-6":
            huellaCarbonoDia += 1.0;
            break;
        case "7-9":
            huellaCarbonoDia += 1.5;
            break;
        case "10+":
            huellaCarbonoDia += 2.0;
            break;
        default:
            break;
    }

    switch (respuestas.consumoPlasticoDia) {
        case "ninguno":
            huellaCarbonoDia += 0;
            break;
        case "1-3":
            huellaCarbonoDia += 0.1;
            break;
        case "4-6":
            huellaCarbonoDia += 0.2;
            break;
        case "7-9":
            huellaCarbonoDia += 0.3;
            break;
        case "10+":
            huellaCarbonoDia += 0.5;
            break;
        default:
            break;
    }

    return huellaCarbonoDia;
}

// Función para mostrar los resultados al usuario
function mostrarResultados(huellaCarbonoDia, huellaMes, huellaAnio) {
    document.getElementById("resultadoDia").textContent = huellaCarbonoDia.toFixed(2) + " toneladas de CO2";
    document.getElementById("resultadoMes").textContent = huellaMes.toFixed(2) + " toneladas de CO2";
    document.getElementById("resultadoAnio").textContent = huellaAnio.toFixed(2) + " toneladas de CO2";
}

// Función para mostrar recomendaciones al usuario
function mostrarRecomendaciones(huellaCarbonoDia) {
    const recomendacionesElement = document.getElementById("recomendaciones");
    let recomendaciones = "¡Buena noticia! Tu huella de carbono es baja. ";

    if (huellaCarbonoDia > 2) {
        recomendaciones = "Tu huella de carbono es relativamente alta. Aquí hay algunas recomendaciones para reducirla:\n";
        recomendaciones += "- Reduce el uso diario de electricidad.\n";
        recomendaciones += "- Considera usar transporte público o compartir viajes.\n";
        recomendaciones += "- Disminuye el consumo de carne y productos plásticos.\n";
        recomendaciones += "- Evalúa la posibilidad de volar menos o compensar tus emisiones.";
    }

    recomendacionesElement.textContent = recomendaciones;
}