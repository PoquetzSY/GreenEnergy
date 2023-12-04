import { collection, addDoc, onSnapshot, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { db } from './firebase.js'

export class HuellasService {
    static async createHuellas(huellaCarbonoDia, estadoSeleccionado) {
        return await addDoc(collection(db, "huellas"), {
            huellaCarbono: huellaCarbonoDia,
            estado: estadoSeleccionado,
            date: Timestamp.now()
        });
    }
    static async onGetHuellas(callback) {
        return await onSnapshot(collection(db, "huellas"), callback);
    }
}