import { adminDb } from "../firebase-admin";
import { Commitment } from "@/types";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

export async function getCommitmentsServer(): Promise<Commitment[]> {
  const snapshot = await adminDb.collection("commitments").get();

  const data: Commitment[] = snapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...doc.data(),
    })
  );

  return JSON.parse(JSON.stringify(data));
}