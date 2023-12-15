# GreEnergy - Plataforma de Energía Limpia

![GreEnergy Logo](https://greenergy.netlify.app/assets/img/icon.png)

## Descripción del Proyecto

GreEnergy es una plataforma web diseñada para fomentar la adopción de energía limpia y sostenible en México. Conecta a investigadores, empresas, gobiernos y organizaciones interesados en promover la investigación y adopción de tecnologías de energía limpia en el país.

## Características Principales

- Calculadora de Huella de Carbono
- Directorio de Instaladores y Proveedores de Energía Limpia
- Lista de Proyectos de Energía Sostenible
- Información sobre Incentivos Fiscales y Regulaciones
- Recursos Educativos sobre Energías Renovables

## Tecnologías Utilizadas

- HTML5
- CSS3 (Bootstrap 5)
- JavaScript (Vanilla JS)
- Firebase (Base de Datos NoSQL)

## Instrucciones de Configuración y Despliegue

1. Clona el repositorio: `git clone https://github.com/tu_usuario/tu_proyecto.git`
2. Abre el archivo `index.html` en tu navegador.

## Configuración de Firebase

1. Crea un proyecto en [Firebase](https://console.firebase.google.com/).
2. Copia y pega la configuración de tu proyecto en `firebaseConfig` en `js/firebase.js`.

```javascript
const firebaseConfig = {
  apiKey: "tu_api_key",
  authDomain: "tu_auth_domain",
  projectId: "tu_project_id",
  storageBucket: "tu_storage_bucket",
  messagingSenderId: "tu_messaging_sender_id",
  appId: "tu_app_id"
};
