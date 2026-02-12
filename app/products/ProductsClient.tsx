'use client';

import React from 'react';
import { useAppState } from '../../hooks/useAppState';

export default function ProductsClient() {
  const { products, categories } = useAppState();

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <p>Số sản phẩm: {products?.length}</p>
    </div>
  );
}
