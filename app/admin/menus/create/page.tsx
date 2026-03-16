'use client';

import { useState, useEffect } from "react";
import { db } from "@/services/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CreateMenu() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState("");
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    const loadMenus = async () => {
      const snap = await getDocs(collection(db, "menus"));
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMenus(data);
    };

    loadMenus();
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    await addDoc(collection(db, "menus"), {
      name,
      slug,
      parentId: parentId || null,
      order: 1,
      isActive: true
    });

    router.push("/admin/menus");
  };

  return (

    <div className="p-6 max-w-xl">

      <h1 className="text-xl font-bold mb-6">
        Thêm Menu
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Tên menu"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Slug /link"
          value={slug}
          onChange={(e)=>setSlug(e.target.value)}
          className="border p-2 w-full"
        />

        <select
          value={parentId}
          onChange={(e)=>setParentId(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">
            Menu cha
          </option>

          {menus.map(menu=>(
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </select>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Lưu Menu
        </button>

      </form>

    </div>
  );
}