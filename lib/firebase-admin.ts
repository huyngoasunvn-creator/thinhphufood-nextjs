import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

let adminDb: any = null;
let adminAuth: any = null;

function initFirebase() {
  if (getApps().length) {
    return {
      db: getFirestore(),
      auth: getAuth(),
    };
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    console.error("❌ Missing Firebase Admin ENV variables");
    return null;
  }

  try {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

    return {
      db: getFirestore(),
      auth: getAuth(),
    };
  } catch (error) {
    console.error("❌ Firebase Admin init error:", error);
    return null;
  }
}

const firebaseAdmin = initFirebase();

if (firebaseAdmin) {
  adminDb = firebaseAdmin.db;
  adminAuth = firebaseAdmin.auth;
}

export { adminDb, adminAuth };