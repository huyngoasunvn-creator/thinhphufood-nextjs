import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let adminDb: any = null;

function initFirebase() {
  if (getApps().length) {
    return getFirestore();
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  // Nếu thiếu ENV → không crash app
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

    return getFirestore();
  } catch (error) {
    console.error("❌ Firebase Admin init error:", error);
    return null;
  }
}

adminDb = initFirebase();

export { adminDb };