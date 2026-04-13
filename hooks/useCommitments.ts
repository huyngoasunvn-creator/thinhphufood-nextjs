'use client';

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import type { Commitment } from "@/types";
import { INITIAL_COMMITMENTS } from "@/data/siteSettings";

export function useCommitments() {
  const [commitments, setCommitments] = useState<Commitment[]>([]);

  useEffect(() => {
    return onSnapshot(
      collection(db, "commitments"),
      (snap) => {
        const data = snap.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        })) as Commitment[];

        setCommitments(data.length > 0 ? data : INITIAL_COMMITMENTS);
      },
      () => setCommitments(INITIAL_COMMITMENTS),
    );
  }, []);

  const saveCommitments = async (updated: Commitment[]) => {
    const currentIds = updated.map((item) => item.id);

    for (const old of commitments) {
      if (!currentIds.includes(old.id)) {
        await deleteDoc(doc(db, "commitments", old.id));
      }
    }

    for (const item of updated) {
      await setDoc(doc(db, "commitments", item.id), item);
    }
  };

  return {
    commitments,
    saveCommitments,
  };
}
