import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { Product, Category } from "../../types";
import RichTextEditor from "../../components/admin/RichTextEditor";
import ProductMultiMedia from "../../components/admin/products/ProductMultiMedia";

interface ProductFormProps {
  initialData?: Product | null;
  categories: Category[]; // ✅ sửa từ string[] -> Category[]
  onSave: (product: Product) => void;
  onClose: () => void;
}

const generateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/([^0-9a-z-\s])/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export default function ProductForm({
  initialData,
  categories,
  onSave,
  onClose,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    slug: "",
    menuId: categories[0]?.id || "",
    price: 0,
    unit: "kg",
    images: [],
    videoUrl: "",
    shortDescription: "",
    description: "",
    stock: 0,
    isBestseller: false,
    isActive: true,
  });

  useEffect(() => {
  if (initialData) {
    const {
      id,
      createdAt,
      updatedAt,
      ...rest
    } = initialData;

    setFormData(rest);
  }
}, [initialData]);
  useEffect(() => {
  if (!initialData && categories.length > 0) {
    setFormData((prev) => ({
      ...prev,
      menuId: prev.menuId || categories[0].id,
    }));
  }
}, [categories, initialData]);
  const handleChange = (field: keyof Product, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: generateSlug(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.menuId) {
  alert("Vui lòng chọn danh mục");
  setLoading(false);
  return;
}
formData.menuId = formData.menuId;

    const method = initialData ? "PUT" : "POST";
    const url = initialData
      ? `/api/products/${initialData.id}`
      : "/api/products";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Lỗi server");

      const savedProduct = await res.json();

      alert("Lưu thành công!");
      onSave(savedProduct);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-slate-900 placeholder:text-slate-400";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b">
          <h3 className="text-xl font-bold">
            {initialData ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </h3>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {/* Tên */}
              <div>
                <label className="block mb-2 font-semibold">
                  Tên sản phẩm *
                </label>
                <input
                  required
                  type="text"
                  className={inputClass}
                  value={formData.name || ""}
                  onChange={(e) => handleNameChange(e.target.value)}
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block mb-2 font-semibold">
                  Đường dẫn SEO (Slug)
                </label>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.slug || ""}
                  onChange={(e) =>
                    handleChange("slug", generateSlug(e.target.value))
                  }
                />
              </div>

              {/* Danh mục + Giá */}
              <div className="grid grid-cols-3 gap-4">

                {/* Category */}
                <div>
                  <label className="block mb-2 font-semibold">
                    Danh mục
                  </label>
                  <select
  className={inputClass}
  value={formData.menuId || ""}
  onChange={(e) => {
    handleChange("menuId", e.target.value);
  }}
>
  {categories.map((cat:any) => (
    <option key={cat.id} value={cat.id}>
      {cat.level ? "— ".repeat(cat.level) : ""}{cat.name}
    </option>
  ))}
</select>
                </div>

                {/* Giá */}
                <div>
                  <label className="block mb-2 font-semibold">
                    Giá bán
                  </label>
                  <input
                    type="number"
                    className={inputClass}
                    value={formData.price || 0}
                    onChange={(e) =>
                      handleChange("price", Number(e.target.value))
                    }
                  />
                </div>

                {/* Đơn vị */}
                <div>
                  <label className="block mb-2 font-semibold">
                    Đơn vị
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.unit || ""}
                    onChange={(e) =>
                      handleChange("unit", e.target.value)
                    }
                  />
                </div>

              </div>

              {/* Mô tả ngắn */}
              <div>
                <label className="block mb-2 font-semibold">
                  Mô tả ngắn
                </label>
                <textarea
                  rows={3}
                  className={inputClass}
                  value={formData.shortDescription || ""}
                  onChange={(e) =>
                    handleChange("shortDescription", e.target.value)
                  }
                />
              </div>

              {/* Mô tả chi tiết */}
              <div>
                <label className="block mb-2 font-semibold">
                  Mô tả chi tiết
                </label>
                <RichTextEditor
                  value={formData.description || ""}
                  onChange={(value) =>
                    handleChange("description", value)
                  }
                />
              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              <div className="bg-slate-50 rounded-2xl p-6 space-y-6">

                <ProductMultiMedia
                  images={formData.images || []}
                  videoUrl={formData.videoUrl || ""}
                  onChange={(images, videoUrl) => {
                    handleChange("images", images);
                    handleChange("videoUrl", videoUrl);
                  }}
                />

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.isBestseller || false}
                    onChange={(e) =>
                      handleChange("isBestseller", e.target.checked)
                    }
                  />
                  <label className="font-semibold">
                    Sản phẩm bán chạy
                  </label>
                </div>
                <div className="flex items-center gap-3">
  <input
    type="checkbox"
    checked={formData.isActive === true}
    onChange={(e) =>
      handleChange("isActive", e.target.checked)
    }
  />
  <label className="font-semibold">
    Hiển thị sản phẩm
  </label>
</div>

                <div>
                  <label className="block mb-2 font-semibold">
                    Số lượng tồn kho
                  </label>
                  <input
                    type="number"
                    className={inputClass}
                    value={formData.stock || 0}
                    onChange={(e) =>
                      handleChange("stock", Number(e.target.value))
                    }
                  />
                </div>

              </div>

            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition"
            >
              <Save className="inline mr-2" />
              {loading ? "Đang lưu..." : "Lưu sản phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}