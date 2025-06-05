import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC2jBeDs_vRvig7tEKD7_XdRQps81pstY",
  authDomain: "backupwatt-f672f.firebaseapp.com",
  projectId: "backupwatt-f672f",
  storageBucket: "backupwatt-f672f.firebasestorage.app",
  messagingSenderId: "293226916956",
  appId: "1:293226916956:web:b9b6268adf0b10a62a8a99"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export async function addCalculation(calc) {
  await setDoc(doc(db, "calculations", calc.id), calc);
}

export async function getCalculations() {
  const querySnapshot = await getDocs(collection(db, "calculations"));
  return querySnapshot.docs.map(doc => doc.data());
}

export async function deleteCalculation(id) {
  await deleteDoc(doc(db, "calculations", id));
}