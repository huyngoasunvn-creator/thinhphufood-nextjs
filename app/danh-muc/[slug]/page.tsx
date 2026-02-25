import { adminDb } from "@/lib/firebase-admin";
import { notFound } from "next/navigation";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

export const dynamic = "force-dynamic"; // 🔥 tránh prerender crash

interface Props {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const slug = params?.slug;

  // 🛑 Guard chống undefined
  if (!slug) return notFound();

  // 1️⃣ Tìm category
  const categorySnapshot = await adminDb
    .collection("categories")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (categorySnapshot.empty) return notFound();

  const categoryDoc = categorySnapshot.docs[0];
  const categoryId = categoryDoc.id;

  if (!categoryId) return notFound();

  // 2️⃣ Lấy sản phẩm theo categoryId
  const productSnapshot = await adminDb
    .collection("products")
    .where("categoryId", "==", categoryId)
    .get();

  const products = productSnapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...doc.data(),
    })
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        {categoryDoc.data().name}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.name}
              className="mb-3 rounded"
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-green-600 font-bold">
              {product.price?.toLocaleString()}đ
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}