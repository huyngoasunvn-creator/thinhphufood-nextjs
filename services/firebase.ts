import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtJnWOoE_oEpLyA03S6875hvWJUoQRkwE",
  authDomain: "thinhphufood-rice.firebaseapp.com",
  projectId: "thinhphufood-rice",
  storageBucket: "thinhphufood-rice.firebasestorage.app",
  messagingSenderId: "452501099665",
  appId: "1:452501099665:web:b06d58aafd7be311ee5b30",
};

// 🔥 Quan trọng: không initialize nhiều lần
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 🔥 Không khởi tạo Auth khi server
export const auth =
  typeof window !== "undefined" ? getAuth(app) : null;

export const db = getFirestore(app);
export const storage = getStorage(app);