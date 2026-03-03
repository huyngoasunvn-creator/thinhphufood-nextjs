"use client";
import type { Banner } from "@/types/site";
import { useEffect, useState } from "react";
import { Pencil, Eye, EyeOff, Trash2, Plus } from "lucide-react";
import BannerForm from "./BannerForm";


export default function Banners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [showModal, setShowModal] = useState(false);

  /* =========================
     Fetch banners
  ========================= */
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/banners");
      const data = await res.json();
      setBanners(data);
    } catch (error) {
      console.error("Lỗi fetch banners:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Delete
  ========================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xoá banner?")) return;

    await fetch(`/api/banners/${id}`, {
      method: "DELETE",
    });

    fetchBanners();
  };

  /* =========================
     Toggle active
  ========================= */
  const handleToggle = async (banner: Banner) => {
    await fetch(`/api/banners/${banner.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...banner, isActive: !banner.isActive }),
    });

    fetchBanners();
  };

  /* =========================
     Open modal
  ========================= */
  const openCreate = () => {
    setEditingBanner(null);
    setShowModal(true);
  };

  const openEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setShowModal(true);
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý Banner</h2>
          <p className="text-gray-500 text-sm">
            Tối ưu hình ảnh & thông điệp hiển thị
          </p>
        </div>

        <button
          onClick={openCreate}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
        >
          <Plus size={18} />
          Thêm Banner
        </button>
      </div>

      {/* ================= LIST ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...banners]
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  .map((banner) => (
          <div
            key={banner.id}
            className="relative group bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-60 object-cover"
              />

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                <button
                  onClick={() => openEdit(banner)}
                  className="bg-white p-3 rounded-xl shadow hover:scale-110 transition"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => handleToggle(banner)}
                  className="bg-white p-3 rounded-xl shadow hover:scale-110 transition"
                >
                  {banner.isActive ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>

                <button
                  onClick={() => handleDelete(banner.id)}
                  className="bg-white p-3 rounded-xl shadow hover:scale-110 transition text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
              <h3 className="font-semibold text-lg">{banner.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                {banner.subtitle}
              </p>
              <p className="text-xs text-gray-400">
  Thứ tự: {banner.order ?? 0}
</p>

              <div className="flex items-center justify-between pt-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    banner.isActive
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {banner.isActive ? "Hiển thị" : "Đang ẩn"}
                </span>

                <span className="text-xs text-gray-400">
                  {banner.placement}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <BannerForm
          initialData={editingBanner}
          onClose={() => setShowModal(false)}
          onSave={async (banner) => {
            if (editingBanner) {
              // UPDATE
              await fetch(`/api/banners/${editingBanner.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(banner),
              });
            } else {
              // CREATE
              await fetch("/api/banners", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(banner),
              });
            }

            setShowModal(false);
            fetchBanners();
          }}
        />
      )}
    </div>
  );
}