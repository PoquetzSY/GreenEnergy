import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
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

export { db }

export class ProjectsService {
    static async createProjects(name, heroImage, thumbnailImage, legend, title, moreinfo, contentOne, contentTwo, subtitle, subcontent, date, estado) {
        return await addDoc(collection(db, "Proyectos"), {
            name: name,
            images: [
                {
                    hero: heroImage,
                    imgp: thumbnailImage
                }
            ],
            legend: legend,
            title: title,
            moreinfo: moreinfo,
            content: [
                {
                    one: contentOne,
                    two: contentTwo
                }
            ],
            subtitle: subtitle,
            subcontent: subcontent,
            date: date,
            estado: estado
        });
        
    }
    static async onGetProjects(callback) {
        return await onSnapshot(collection(db, "Proyectos"), callback);
    }
    static async deleteProjects(id){
        return await deleteDoc(doc(db, "Proyectos", id));
    }
    static async getProject (id){
        return await getDoc(doc(db, "Proyectos", id));
    }
    static async updateProject(id, newFields){
        return await updateDoc(doc(db, "Proyectos", id), newFields)
    }
}