import { db } from './firebase.js'
import { onSnapshot, collection, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const dao = {
    async getLatestDocuments(collectionName, callback) {
        try {
            const q = query(collection(db, collectionName), orderBy('date', 'desc'), limit(5));

            // Usa onSnapshot para obtener los últimos documentos y mantener actualizada la vista en tiempo real
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const latestDocuments = querySnapshot.docs.map(doc => doc.data());
                callback(latestDocuments);
            });

            // Retorna la función unsubscribe para que puedas dejar de escuchar los cambios cuando sea necesario
            return unsubscribe;
        } catch (error) {
            console.error('Error al obtener los documentos:', error);
            throw error;
        }
    },
};

export { dao };
