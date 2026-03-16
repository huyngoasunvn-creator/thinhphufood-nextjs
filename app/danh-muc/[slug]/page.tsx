export const dynamic = "force-dynamic";

import { adminDb } from "@/lib/firebase-admin";
import { redirect, notFound } from "next/navigation";

export default async function CategoryPage({ params }: any) {
  const snapshot = await adminDb
    .collection("menus")
    .where("slug", "==", params.slug)
    .limit(1)
    .get();

  if (snapshot.empty) return notFound();

  const menuId = snapshot.docs[0].id;

  redirect(`/san-pham?category=${menuId}`);
}