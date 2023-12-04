import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { app } from "../services/firebase.js";

const auth = getAuth();

export class ManageAccount {
    register(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((_) => {
                window.location.href = "/view/admin/dashboard.html";
                // Mostrar alerta de registro exitoso
                alert("Registro exitoso. Serás redirigido a la página de inicio de sesión.");
            })
            .catch((error) => {
                console.error(error.message);
                // Mostrar alerta de error de registro
                alert("Error al registrar: " + error.message);
            });
    }

    authenticate(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((_) => {
                window.location.href = "/view/admin/dashboard.html";
            })
            .catch((error) => {
                console.error(error.message);
                // Mostrar alerta de error de inicio de sesión
                console.log("Error al iniciar sesión: " + error.message);
            });
    }

    signOut() {
        signOut(auth)
            .then((_) => {
                window.location.href = "/";
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}