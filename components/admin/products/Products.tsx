'use client';

import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit2, Trash2, Copy } from 'lucide-react';
import { Product, Category } from '@/types';
import ProductForm from '../ProductForm';

interface AdminProductsProps {
  products: Product[];
  categories: Category[];
  onAdd: (p: Product) => void;
  onUpdate: (p: Product) => void;
  onDelete: (id: string) => void;
}

const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  categories,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  /* ================= FILTER ================= */

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryName =
        categories.find((c) => c.id === p.menuId)?.name || '';

      return (
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categoryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [products, searchTerm, categories]);

  /* ================= HANDLERS ================= */

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCopyProduct = (product: Product) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      name: `${product.name} (Bản sao)`,
      stock: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onAdd(newProduct);
  };

  const handleToggleActive = (product: Product) => {
    onUpdate({
      ...product,
      isActive: product.isActive === false ? true : false,
    });
  };

  const handleSave = (product: Product) => {
    if (editingProduct) {
      onUpdate(product);
    } else {
      onAdd(product);
    }
    setIsModalOpen(false);
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:bg-green-700 shadow-xl shadow-green-100 transition-all active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span>Thêm sản phẩm mới</span>
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase">Sản phẩm</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase">Danh mục</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase">Giá bán</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase text-center">Tồn kho</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase text-center">Trạng thái</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase text-right">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors group">

                  {/* PRODUCT INFO */}
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-4">
                      <div className="h-14 w-14 rounded-2xl overflow-hidden bg-slate-100 shadow-sm border">
                        <img
                          src={p.images?.[0] || "/placeholder.jpg"}
                          className="h-full w-full object-cover"
                          alt={p.name}
                        />
                      </div>

                      <div className="max-w-[240px]">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {p.name}
                        </p>

                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-[10px] text-slate-400 font-mono">
                            ID: {p.id}
                          </span>

                          {p.isBestseller && (
                            <span className="bg-yellow-100 text-yellow-700 text-[8px] px-2 rounded-full font-bold uppercase">
                              Hot
                            </span>
                          )}

                          {p.isActive === false && (
                            <span className="bg-gray-200 text-gray-600 text-[8px] px-2 rounded-full font-bold uppercase">
                              Ẩn
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase">
                      {categories.find((c) => c.id === p.menuId)?.name || "Không có"}
                    </span>
                  </td>

                  {/* PRICE */}
                  <td className="px-8 py-5 text-sm font-bold text-green-700">
                    {p.price.toLocaleString()}đ
                    <span className="text-[10px] text-slate-400 font-normal">
                      /{p.unit}
                    </span>
                  </td>

                  {/* STOCK */}
                  <td className="px-8 py-5 text-center">
                    <span className={`font-bold ${p.stock < 10 ? 'text-red-500' : 'text-slate-600'}`}>
                      {p.stock}
                    </span>
                  </td>

                  {/* STATUS + RATING */}
                  <td className="px-8 py-5 text-center">
                    <div className="flex flex-col items-center gap-2">

                      <span className="text-xs text-yellow-500 font-bold">
                        ⭐ {p.rating ?? 0} ({p.reviewCount ?? 0})
                      </span>

                      <button
                        onClick={() => handleToggleActive(p)}
                        className={`text-[10px] px-3 py-1 rounded-full font-bold transition-all ${
                          p.isActive === false
                            ? "bg-gray-200 text-gray-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {p.isActive === false ? "Đã ẩn" : "Đang hiển thị"}
                      </button>

                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopyProduct(p)}
                        className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                      >
                        <Copy className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-2.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      <button
  onClick={() => {
    if (confirm(`Bạn có chắc muốn xoá "${p.name}" không?`)) {
      onDelete(p.id);
    }
  }}
  className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
>
  <Trash2 className="h-4 w-4" />
</button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ProductForm
          initialData={editingProduct}
          categories={categories}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminProducts;