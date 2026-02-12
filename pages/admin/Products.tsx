
import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit2, Trash2, Copy } from 'lucide-react';
import { Product } from '../../types';
import ProductForm from './ProductForm';

interface AdminProductsProps {
  products: Product[];
  categories: string[];
  onAdd: (p: Product) => void;
  onUpdate: (p: Product) => void;
  onDelete: (id: string) => void;
}

const AdminProducts: React.FC<AdminProductsProps> = ({ products, categories, onAdd, onUpdate, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCopyProduct = (product: Product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      name: `${product.name} (Bản sao)`,
      stock: 0 // Reset kho cho bản sao
    };
    onAdd(newProduct);
  };

  const handleSave = (product: Product) => {
    if (editingProduct) {
      onUpdate(product);
    } else {
      onAdd(product);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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

      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Sản phẩm</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Danh mục</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Giá bán</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Tồn kho</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-4">
                      <div className="h-14 w-14 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm border border-slate-200">
                        <img src={p.image} className="h-full w-full object-cover" alt="" />
                      </div>
                      <div className="max-w-[240px]">
                        <p className="text-sm font-bold text-slate-900 truncate">{p.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                           <p className="text-[10px] text-slate-400 font-mono">ID: {p.id}</p>
                           {p.isBestseller && <span className="bg-yellow-100 text-yellow-700 text-[8px] px-1.5 rounded-full font-bold uppercase">Hot</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase">{p.category}</span>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-green-700">
                    {p.price.toLocaleString()}đ <span className="text-[10px] text-slate-400 font-normal">/{p.unit}</span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <span className={`text-sm font-bold ${p.stock < 10 ? 'text-red-500' : 'text-slate-600'}`}>
                        {p.stock}
                      </span>
                      <div className="w-12 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div className={`h-full rounded-full ${p.stock < 10 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(p.stock, 100)}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleCopyProduct(p)}
                        title="Copy sản phẩm"
                        className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleOpenEditModal(p)}
                        title="Sửa sản phẩm"
                        className="p-2.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(p.id)}
                        title="Xóa sản phẩm"
                        className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
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
