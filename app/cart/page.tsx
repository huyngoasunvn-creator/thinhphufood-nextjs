'use client';

import React from 'react';
import Cart from '@/components/Cart';
import { useAppState } from '@/hooks/useAppState';

export default function CartPage() {
  const state = useAppState();

  // 🛡 Guard: tránh destructuring từ undefined khi prerender
  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 text-sm">Đang tải giỏ hàng...</p>
      </div>
    );
  }

  const {
    cartItems = [],
    updateQuantity = () => {},
    setQuantity = () => {},
    removeItem = () => {},
    clearCart = () => {},
    addOrder = () => {},
  } = state;

  return (
    <Cart
      cartItems={cartItems}
      onUpdateQuantity={updateQuantity}
      onSetQuantity={setQuantity}
      onRemoveItem={removeItem}
      onClearCart={clearCart}
      onAddOrder={addOrder}
    />
  );
}