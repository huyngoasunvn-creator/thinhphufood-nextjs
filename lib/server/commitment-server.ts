import { adminDb } from "../firebase-admin";
import { Commitment } from "@/types";

export async function getCommitmentsServer(): Promise<Commitment[]> {
  const snapshot = await adminDb.collection("commitments").get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Commitment, "id">),
  }));
}

