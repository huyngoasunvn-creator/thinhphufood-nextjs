'use client';

import { useEffect, useMemo, useState } from "react";
import { db } from "@/services/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

type AdminMenuItem = {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  order?: number;
  isActive?: boolean;
};

type MenuSeedItem = {
  name: string;
  slug: string;
  order: number;
  children?: Array<{
    name: string;
    slug: string;
    order: number;
  }>;
};

const NONG_SAN_SEED: MenuSeedItem = {
  name: "Nông sản",
  slug: "nong-san",
  order: 3,
  children: [
    { name: "Rau củ sạch", slug: "rau-cu-sach", order: 1 },
    { name: "Trái cây tươi", slug: "trai-cay-tuoi", order: 2 },
    { name: "Nông sản sấy", slug: "nong-san-say", order: 3 },
    { name: "Đặc sản vùng miền", slug: "dac-san-vung-mien", order: 4 },
  ],
};

const normalizeSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AdminMenus() {
  const [menus, setMenus] = useState<AdminMenuItem[]>([]);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [order, setOrder] = useState(0);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const loadMenus = async () => {
    const menuQuery = query(collection(db, "menus"), orderBy("order", "asc"));
    const snapshot = await getDocs(menuQuery);

    const data = snapshot.docs.map((menuDoc) => ({
      id: menuDoc.id,
      ...menuDoc.data(),
    })) as AdminMenuItem[];

    setMenus(data);
  };

  useEffect(() => {
    loadMenus()
      .catch((error) => console.error("Load menus error:", error))
      .finally(() => setLoading(false));
  }, []);

  const parents = useMemo(
    () => menus.filter((menu) => !menu.parentId),
    [menus],
  );

  const getChildren = (id: string) =>
    menus.filter((menu) => menu.parentId === id);

  const resetForm = () => {
    setEditingId("");
    setName("");
    setParentId("");
    setOrder(0);
  };

  const handleAdd = async () => {
    if (!name.trim()) {
      alert("Vui lòng nhập tên menu.");
      return;
    }

    await addDoc(collection(db, "menus"), {
      name: name.trim(),
      slug: normalizeSlug(name),
      parentId: parentId || null,
      order,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    resetForm();
    await loadMenus();
  };

  const handleUpdate = async () => {
    if (!editingId || !name.trim()) {
      alert("Vui lòng nhập tên menu.");
      return;
    }

    await updateDoc(doc(db, "menus", editingId), {
      name: name.trim(),
      slug: normalizeSlug(name),
      parentId: parentId || null,
      order,
      updatedAt: new Date(),
    });

    resetForm();
    await loadMenus();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa menu này?")) return;

    await deleteDoc(doc(db, "menus", id));
    await loadMenus();
  };

  const toggleActive = async (menu: AdminMenuItem) => {
    await updateDoc(doc(db, "menus", menu.id), {
      isActive: menu.isActive === false ? true : false,
      updatedAt: new Date(),
    });

    await loadMenus();
  };

  const handleEdit = (menu: AdminMenuItem) => {
    setEditingId(menu.id);
    setName(menu.name);
    setParentId(menu.parentId || "");
    setOrder(menu.order || 0);
  };

  const handleSeedNongSan = async () => {
    try {
      setSeeding(true);

      const existingMenus = await getDocs(collection(db, "menus"));
      const currentMenus = existingMenus.docs.map((menuDoc) => ({
        id: menuDoc.id,
        ...menuDoc.data(),
      })) as AdminMenuItem[];

      let root = currentMenus.find(
        (menu) => normalizeSlug(menu.slug || "") === NONG_SAN_SEED.slug,
      );

      if (!root) {
        const rootRef = await addDoc(collection(db, "menus"), {
          name: NONG_SAN_SEED.name,
          slug: NONG_SAN_SEED.slug,
          parentId: null,
          order: NONG_SAN_SEED.order,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        root = {
          id: rootRef.id,
          name: NONG_SAN_SEED.name,
          slug: NONG_SAN_SEED.slug,
          parentId: null,
          order: NONG_SAN_SEED.order,
          isActive: true,
        };
      }

      for (const child of NONG_SAN_SEED.children || []) {
        const existedChild = currentMenus.find(
          (menu) =>
            menu.parentId === root?.id &&
            normalizeSlug(menu.slug || "") === child.slug,
        );

        if (existedChild) {
          continue;
        }

        await addDoc(collection(db, "menus"), {
          name: child.name,
          slug: child.slug,
          parentId: root.id,
          order: child.order,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      await loadMenus();
      alert("Đã tạo sẵn cấu trúc Nông sản mẫu.");
    } catch (error) {
      console.error("Seed nong san error:", error);
      alert("Không thể tạo cấu trúc Nông sản mẫu.");
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return <p>Đang tải menu...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Menu Website</h1>
          <p className="text-sm text-slate-500">
            Bạn có thể tạo menu cha, menu con và bật/tắt hiển thị từng mục.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSeedNongSan}
          disabled={seeding}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold disabled:opacity-70"
        >
          {seeding ? "Đang tạo..." : "Tạo sẵn Nông sản mẫu"}
        </button>
      </div>

      <div className="border p-4 rounded-2xl space-y-3 bg-white">
        <input
          className="border p-3 w-full rounded-xl"
          placeholder="Tên menu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="border p-3 w-full rounded-xl"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
        >
          <option value="">Menu cha</option>

          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.parentId ? "— " : ""}
              {menu.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="border p-3 w-full rounded-xl"
          placeholder="Thứ tự"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
        />

        <div className="flex gap-3">
          {editingId ? (
            <>
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-orange-500 text-white px-4 py-2 rounded-xl"
              >
                Cập nhật menu
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl"
              >
                Hủy sửa
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Thêm menu
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {parents.map((parent) => (
          <div key={parent.id} className="border p-4 rounded-2xl bg-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <b>{parent.order ?? 0}</b> - {parent.name}
                <div className="text-sm text-gray-500">/{parent.slug}</div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => toggleActive(parent)}
                  className={`px-3 py-1 rounded text-white ${
                    parent.isActive !== false ? "bg-green-600" : "bg-gray-400"
                  }`}
                >
                  {parent.isActive !== false ? "Hiện" : "Ẩn"}
                </button>

                <button
                  type="button"
                  onClick={() => handleEdit(parent)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Sửa
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(parent.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </div>
            </div>

            {getChildren(parent.id).map((child) => (
              <div
                key={child.id}
                className="ml-0 md:ml-6 mt-3 border-l pl-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div>
                  ↳ {child.name}
                  <div className="text-sm text-gray-500">/{child.slug}</div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => toggleActive(child)}
                    className={`px-3 py-1 rounded text-white ${
                      child.isActive !== false ? "bg-green-600" : "bg-gray-400"
                    }`}
                  >
                    {child.isActive !== false ? "Hiện" : "Ẩn"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEdit(child)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Sửa
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(child.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
