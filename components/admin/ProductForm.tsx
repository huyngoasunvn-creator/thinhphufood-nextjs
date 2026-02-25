import React, { useState, useEffect } from 'react';
import { X, Save, Info } from 'lucide-react';
import { Product } from '../../types';
import RichTextEditor from '../../components/admin/RichTextEditor';
import ProductMultiMedia from '../../components/admin/products/ProductMultiMedia';

interface ProductFormProps {
  initialData?: Product | null;
  categories: string[];
  onSave: (product: Product) => void;
  onClose: () => void;
}

const generateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export default function ProductForm({
  initialData,
  categories,
  onSave,
  onClose,
}: ProductFormProps) {

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    slug: '',
    category: categories[0] || '',
    price: 0,
    unit: 'kg',
    images: [],
    videoUrl: '',
    shortDescription: '',
    description: '',
    stock: 0,
    isBestseller: false,
  });

  // Load dữ liệu khi edit
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleNameChange = (value: string) => {
    setFormData({
      ...formData,
      name: value,
      slug: generateSlug(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      alert("Lưu thành công!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra!");
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
          <input
            required
            type="text"
            className={inputClass}
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-xl mt-6"
          >
            <Save className="inline mr-2" />
            Lưu sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
}