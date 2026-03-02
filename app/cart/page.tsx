'use client';

import React from 'react';
import Cart from '@/components/Cart';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/hooks/useOrders'; // 👈 thêm dòng này

export default function CartPage() {

  const {
    cart,
    removeFromCart,
    clearCart,
    updateQuantity,
    setQuantity
  } = useCart();

  const { addOrder } = useOrders(); // 👈 thêm dòng này

  return (
    <Cart
      cartItems={cart}
      onRemoveItem={removeFromCart}
      onClearCart={clearCart}
      onUpdateQuantity={updateQuantity}
      onSetQuantity={setQuantity}
      onAddOrder={addOrder}   // 👈 THÊM DÒNG NÀY
    />
  );
}