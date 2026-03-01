'use client';

import React, { useEffect, useState } from 'react';
import Products from '@/components/admin/products/Products';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  async function loadData() {
  const [pRes, cRes] = await Promise.all([
    fetch('/api/admin/products', { cache: 'no-store' }),
    fetch('/api/categories', { cache: 'no-store' }),
  ]);

  const pData = await pRes.json();
  const cData = await cRes.json();

  setProducts(pData.products || pData);
  setCategories(cData.categories || []);
}

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdate = async (p: any) => {
    await fetch(`/api/admin/products/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });

    await loadData();
  };

  const handleDelete = async (id: string) => {
    fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    await loadData();
    alert("Đã xoá sản phẩm thành công");
  };

  return (
    <Products
      products={products}
      categories={categories}
      onAdd={loadData}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}