'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  GripVertical,
  Edit2,
  Trash2,
  Check,
  X,
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCat, setNewCat] = useState('');
  const [parentId, setParentId] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editParentId, setEditParentId] = useState<string>('');

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    const res = await fetch('/api/admin/categories');
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= TREE UTILS ================= */

  const getChildren = (parentId: string | null) => {
    return categories.filter(
      (c) => (c.parentId || null) === parentId
    );
  };

  const getDescendants = (id: string): string[] => {
    const children = getChildren(id);
    let result: string[] = [];

    children.forEach((child) => {
      result.push(child.id);
      result = [...result, ...getDescendants(child.id)];
    });

    return result;
  };

  /* ================= ADD ================= */
  const handleAdd = async () => {
    if (!newCat.trim()) return;

    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newCat.trim(),
        parentId: parentId || null,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setNewCat('');
      setParentId('');
      fetchCategories();
    } else {
      alert('Thêm thất bại');
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm('Xóa danh mục này và toàn bộ cấp con?')) return;

    const res = await fetch('/api/admin/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) fetchCategories();
  };

  /* ================= EDIT ================= */
  const handleStartEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditValue(cat.name);
    setEditParentId(cat.parentId || '');
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;

    // không cho chọn chính nó hoặc con cháu làm cha
    const descendants = getDescendants(editingId);

    if (descendants.includes(editParentId)) {
      alert('Không thể chọn danh mục con làm danh mục cha');
      return;
    }

    if (editingId === editParentId) {
      alert('Không thể chọn chính nó làm cha');
      return;
    }

    const res = await fetch('/api/admin/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingId,
        newName: editValue.trim(),
        parentId: editParentId || null,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setEditingId(null);
      fetchCategories();
    } else {
      alert('Cập nhật thất bại');
    }
  };

  /* ================= RENDER TREE ================= */

  const renderTree = (parentId: string | null = null, level = 0) => {
    const items = getChildren(parentId);

    return items.map((item) => (
      <div key={item.id} style={{ marginLeft: level * 24 }}>
        <div className="flex justify-between items-center py-2 border-b">
          <div className="flex items-center gap-3 flex-1">
            <GripVertical size={16} />

            {editingId === item.id ? (
              <div className="flex gap-2 flex-1">
                <input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 px-3 py-1 border rounded-lg"
                />

                <select
                  value={editParentId}
                  onChange={(e) => setEditParentId(e.target.value)}
                  className="px-3 py-1 border rounded-lg"
                >
                  <option value="">-- Không có cha --</option>
                  {categories
                    .filter((c) => c.id !== item.id)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>

                <button onClick={handleSaveEdit}>
                  <Check size={18} />
                </button>

                <button onClick={() => setEditingId(null)}>
                  <X size={18} />
                </button>
              </div>
            ) : (
              <span className="font-medium">
                {'— '.repeat(level)}
                {item.name}
              </span>
            )}
          </div>

          {editingId !== item.id && (
            <div className="flex gap-2">
              <button onClick={() => handleStartEdit(item)}>
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(item.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {renderTree(item.id, level + 1)}
      </div>
    ));
  };

  /* ================= RENDER ================= */

  return (
    <div className="max-w-3xl space-y-6">

      {/* ADD BOX */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Plus className="mr-2" /> Thêm danh mục
        </h3>

        <div className="flex flex-col gap-3">
          <input
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            className="px-4 py-2 border rounded-xl"
            placeholder="Tên danh mục..."
          />

          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="px-4 py-2 border rounded-xl"
          >
            <option value="">-- Danh mục cha --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
          >
            Thêm
          </button>
        </div>
      </div>

      {/* TREE */}
      <div className="bg-white rounded-2xl border shadow-sm p-4">
        {renderTree(null)}
      </div>
    </div>
  );
};

export default AdminCategories;