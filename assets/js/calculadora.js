//calculadora
export function calcularHuella() {
    const respuestas = obtenerRespuestas();
    const huellaCarbonoDia = calcularHuellaDia(respuestas);
    const huellaMes = huellaCarbonoDia * 30;
    const huellaAnio = huellaMes * 12;

    mostrarResultados(huellaCarbonoDia, huellaMes, huellaAnio);
    mostrarRecomendaciones(huellaCarbonoDia, respuestas);
}

export function reiniciarFormulario() {
    const formulario = document.getElementById("calculator");
    formulario.reset();
    ocultarResultados();
}
// Función para obtener las respuestas del usuario
export function obtenerRespuestas() {
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
export function calcularHuellaDia(respuestas) {
    let huellaCarbonoDia = 0;
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
        switch (respuestas.frecuenciaTransporte) {
            case "diario":
                huellaCarbonoDia += 0.2;
                break;
            case "medio":
                huellaCarbonoDia += 0.1;
                break;
            case "alto":
                huellaCarbonoDia += 0.05;
                break;
            default:
                break;
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

function mostrarResultados(huellaCarbonoDia, huellaMes, huellaAnio) {
    document.getElementById("resultadosc").style.display = "block";
    document.getElementById("resultadoDia").textContent = huellaCarbonoDia.toFixed(2) + " toneladas de CO2";
    document.getElementById("resultadoMes").textContent = huellaMes.toFixed(2) + " toneladas de CO2";
    document.getElementById("resultadoAnio").textContent = huellaAnio.toFixed(2) + " toneladas de CO2";
}

function mostrarRecomendaciones(huellaCarbonoDia,respuestas) {
    const recomendacionesElement = document.getElementById("recomendaciones");
    let recomendaciones = "";

    if (huellaCarbonoDia < 1){
        recomendaciones = "¡Buena noticia! Tu huella de carbono es baja.";
    }else if (huellaCarbonoDia >= 1) {
        recomendaciones = "Tu huella de carbono es significativa. Aquí hay algunas recomendaciones para reducirla:\n";
        if(huellaCarbonoDia > 2){
            recomendaciones = "Tu huella de carbono es relativamente alta. Aquí hay algunas recomendaciones para reducirla:\n";
        }

        if (respuestas.transportePublico === "no") {
            recomendaciones += "- Considera usar transporte público o compartir viajes.\n";
        }

        if (respuestas.electricidadDia === "alto") {
            recomendaciones += "- Reduce el uso diario de electricidad, apaga dispositivos cuando no los necesites.\n";
        } else if (respuestas.electricidadDia === "medio") {
            recomendaciones += "- Considera cambiar a fuentes de energía más sostenibles para tu hogar.\n";
        }

        if (respuestas.numVuelosAnio === "10+") {
            recomendaciones += "- Evalúa la posibilidad de volar menos o compensar tus emisiones.\n";
        } else if (respuestas.numVuelosAnio === "4-6") {
            recomendaciones += "- Reduzca los vuelos intermedios para disminuir la huella de carbono.\n";
        } else if (respuestas.numVuelosAnio === "7-9") {
            recomendaciones += "- Considere reducir aún más la frecuencia de vuelos para disminuir las emisiones.\n";
        }

        if (respuestas.consumoCarne === "mucho") {
            recomendaciones += "- Disminuye el consumo de carne, prueba con días sin carne o platos vegetarianos.\n";
        } else if (respuestas.consumoCarne === "moderado") {
            recomendaciones += "- Considera reducir la cantidad de carne roja en tu dieta.\n";
        }

        if (respuestas.consumoPlasticoDia === "10+") {
            recomendaciones += "- Reduce el consumo de productos plásticos, utiliza opciones reutilizables y reciclables.\n";
        } else if (respuestas.consumoPlasticoDia === "4-6") {
            recomendaciones += "- Intenta reducir aún más tu consumo de productos plásticos.\n";
        } else if (respuestas.consumoPlasticoDia === "7-9") {
            recomendaciones += "- Busca alternativas sostenibles para disminuir tu huella de plástico.\n";
        }
    }

    const listaRecomendaciones = recomendaciones.split('\n').filter(Boolean);
    const listaHTML = listaRecomendaciones.map(recomendacion => `<li>${recomendacion}</li>`).join('');

    recomendacionesElement.innerHTML = `<ul>${listaHTML}</ul>`;
}
function ocultarResultados() {
    document.getElementById("resultadosc").style.display = "none";
    document.getElementById("formCompartirHuella").style.display = "none"
    document.getElementById("share-h5").style.display = "none"
    document.getElementById("exampleModalLabel").style.display = "block"
    document.getElementById("calculator").style.display = "block"
    document.getElementById("btnCalcular").style.display = "block"
}