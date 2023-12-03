import { collection, addDoc, onSnapshot, doc, deleteDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { db } from './firebase.js'

export class ServicesService {
    static async createServices(name, heroImage, thumbnailImage, subImage, title, contentP, subtitle, subcontent, firstS, secondS, thirdS, contact, home, contactLink) {
        return await addDoc(collection(db, "Servicios"), {
            name: name,
            images: [
                {
                    hero: heroImage,
                    imgp: thumbnailImage,
                    subimage: subImage
                }
            ],
            title: title,
            content: contentP,
            subtitle: subtitle,
            subcontent: subcontent,
            servicios: [
                {
                    first: firstS,
                    second: secondS,
                    third: thirdS
                }
            ],
            contact: contact,
            links: [
                {
                    home: home,
                    contact: contactLink
                }
            ]
            
        });
    }
    static async onGetServices(callback) {
        return await onSnapshot(collection(db, "Servicios"), callback);
    }
    static async deleteServices(id){
        return await deleteDoc(doc(db, "Servicios", id));
    }
    static async getService (id){
        return await getDoc(doc(db, "Servicios", id));
    }
    static async updateService(id, newFields){
        return await updateDoc(doc(db, "Servicios", id), newFields)
    }
}