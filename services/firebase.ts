import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtJnWOoE_oEpLyA03S6875hvWJUoQRkwE",
  authDomain: "thinhphufood-rice.firebaseapp.com",
  projectId: "thinhphufood-rice",
  storageBucket: "thinhphufood-rice.firebasestorage.app",
  messagingSenderId: "452501099665",
  appId: "1:452501099665:web:b06d58aafd7be311ee5b30"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
