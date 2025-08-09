
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCVPC1HDoXXDTiPjv5I1PO33I-hJmfEG1E",
  authDomain: "bloggy-de8ac.firebaseapp.com",
  projectId: "bloggy-de8ac",
  storageBucket: "bloggy-de8ac.firebasestorage.app",
  messagingSenderId: "785197876654",
  appId: "1:785197876654:web:ea4c3b0eb7a09fc604b43f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();



