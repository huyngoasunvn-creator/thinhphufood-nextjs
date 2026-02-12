
'use client';

import React from 'react';
import Cart from '../../pages/Cart';
import { useAppState } from '../../hooks/useAppState';

export default function CartPage() {
  const { 
    cartItems, updateQuantity, setQuantity, 
    removeItem, clearCart, addOrder 
  } = useAppState();

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
