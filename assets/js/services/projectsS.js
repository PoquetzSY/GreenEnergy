import { collection, addDoc, onSnapshot, doc, deleteDoc, getDoc, updateDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { db } from './firebase.js'

export class ProjectsService {
    static async createProjects(name, heroImage, thumbnailImage, legend, title, moreinfo, contentOne, contentTwo, subtitle, subcontent, estado) {
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
            date: Timestamp.now(),
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