import { ManageAccount } from './authenticate.js';
const formulario = document.getElementById("formulario-sesion");
formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if ( email.trim() === '' || password.trim() === '' ){
        alert('Por favor, complete todos los campos.');
        formulario.reset()
    } else {
        const account = new ManageAccount();
        account.authenticate(email, password);
    }

});

console.log('Formulario de Inicio de Sesión');