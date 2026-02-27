'use client';

import React, { useState, useEffect } from 'react';
import { Plus, GripVertical, Edit2, Trash2, Check, X } from 'lucide-react';

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

  /* ================= ADD ================= */
  const handleAdd = async () => {
    const trimmed = newCat.trim();
    if (!trimmed) return;

    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: trimmed,
        parentId: parentId || null,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setNewCat('');
      setParentId('');
      fetchCategories();
    } else {
      alert('Lỗi khi thêm danh mục');
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa?')) return;

    const res = await fetch('/api/admin/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      fetchCategories();
    } else {
      alert('Xóa thất bại');
    }
  };

  /* ================= EDIT ================= */
  const handleStartEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditValue(cat.name);
    setEditParentId(cat.parentId || '');
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;

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
  const parents = categories.filter((c) => !c.parentId);

  return (
    <div className="max-w-2xl space-y-6">

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
            <option value="">-- Danh mục cha (cấp 1) --</option>
            {parents.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-6 py-2 rounded-xl"
          >
            Thêm
          </button>
        </div>
      </div>

      {/* LIST TREE */}
<div className="bg-white rounded-2xl border shadow-sm divide-y">
  {parents.map((parent) => {
    const children = categories.filter(
      (c) => c.parentId === parent.id
    );

    return (
      <div key={parent.id} className="p-4">

        {/* ================= PARENT ================= */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 flex-1">
            <GripVertical size={16} />

            {editingId === parent.id ? (
              <div className="flex gap-2 flex-1">
                <input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 px-3 py-1 border rounded-lg"
                />
                <button onClick={handleSaveEdit}>
                  <Check size={18} />
                </button>
                <button onClick={() => setEditingId(null)}>
                  <X size={18} />
                </button>
              </div>
            ) : (
              <span className="font-semibold">{parent.name}</span>
            )}
          </div>

          {editingId !== parent.id && (
            <div className="flex gap-2">
              <button onClick={() => handleStartEdit(parent)}>
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(parent.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* ================= CHILDREN ================= */}
        {children.map((child) => (
          <div
            key={child.id}
            className="flex justify-between items-center mt-3 ml-6 text-gray-600"
          >
            <div className="flex items-center gap-3 flex-1">
              <GripVertical size={16} />

              {editingId === child.id ? (
                <div className="flex gap-2 flex-1">
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 px-3 py-1 border rounded-lg"
                  />
                  <button onClick={handleSaveEdit}>
                    <Check size={18} />
                  </button>
                  <button onClick={() => setEditingId(null)}>
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <span>└ {child.name}</span>
              )}
            </div>

            {editingId !== child.id && (
              <div className="flex gap-2">
                <button onClick={() => handleStartEdit(child)}>
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(child.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  })}

      </div>
    </div>
  );
};

export default AdminCategories;