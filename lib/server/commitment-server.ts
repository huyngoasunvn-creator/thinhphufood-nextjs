import { adminDb } from "../firebase-admin";
import { Commitment } from "@/types";

export async function getCommitmentsServer(): Promise<Commitment[]> {
  const snapshot = await adminDb.collection("commitments").get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return JSON.parse(JSON.stringify(data));
}


