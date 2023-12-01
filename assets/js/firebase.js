import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  doc
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAcny_RMgaJhaEV-Io9_7Ipywqj222r5MA",
  authDomain: "test-670a8.firebaseapp.com",
  projectId: "test-670a8",
  storageBucket: "test-670a8.appspot.com",
  messagingSenderId: "494352922960",
  appId: "1:494352922960:web:5470dcb0ce042ef83ed455"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// try {
//   const docRef = 
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// try {
//   let data = []
//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//     const item = doc.data()
//     item.id = doc.id
//     data.push(item)
//   });
//   console.log(data)
// } catch (error) {
//   console.log(error)
// }


//Objeto estás usando algo parecido a DAO, cada objeto es el crud de una colección
export class UserService {
    static async createUsers(name, age){
        return await addDoc(collection(db, "users"), {name, age});
    }
    static async getUsers(){
      return await getDocs(collection(db, "users"));
    }
}
