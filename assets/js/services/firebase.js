import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyATmu_FBB2j1B0uAAGcS0N-T4hEpyKS34M",
    authDomain: "greenenergy-782952.firebaseapp.com",
    projectId: "greenenergy-782952",
    storageBucket: "greenenergy-782952.appspot.com",
    messagingSenderId: "203409458885",
    appId: "1:203409458885:web:99f32d1b13fcba86dc92ac",
    measurementId: "G-C95ZBPB2D8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app ,db }