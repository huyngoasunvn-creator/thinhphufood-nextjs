'use client';

import React, { useEffect, useState } from 'react';
import Products from '@/components/admin/products/Products';

function buildMenuTree(menus:any[]){

  const parents = menus.filter(m => !m.parentId)
  const children = menus.filter(m => m.parentId)

  const result:any[] = []

  parents.forEach(parent => {

    result.push({
      ...parent,
      level:0
    })

    const childList = children.filter(c => c.parentId === parent.id)

    childList.forEach(child=>{
      result.push({
        ...child,
        level:1
      })
    })

  })

  return result
}

export default function AdminProductsPage() {

  const [products, setProducts] = useState<any[]>([]);
const [categories, setCategories] = useState<any[]>([]);

  /* ================= LOAD DATA ================= */

  async function loadData() {

    const [pRes, mRes] = await Promise.all([
      fetch('/api/admin/products', { cache: 'no-store' }),
      fetch('/api/menus', { cache: 'no-store' })   // 🔥 đổi từ categories -> menus
    ]);

    const pData = await pRes.json();
    const mData = await mRes.json();

    setProducts(pData.products || pData);

    /* chỉ lấy menu active */
    const menus = (mData.menus || mData || []).filter(
      (m: any) => m.isActive !== false
    );

    const treeMenus = buildMenuTree(menus)

setCategories(treeMenus)
  }

  /* ================= LOAD PAGE ================= */

  useEffect(() => {
    loadData();
  }, []);

  /* ================= UPDATE ================= */

  const handleUpdate = async (p: any) => {

    await fetch(`/api/admin/products/${p.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(p),
    });

    await loadData();
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {

    await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    await loadData();

    alert("Đã xoá sản phẩm thành công");
  };

  /* ================= RENDER ================= */

  return (
    <Products
      products={products}
      categories={categories}   // 🔥 categories lúc này chính là menus
      onAdd={loadData}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}