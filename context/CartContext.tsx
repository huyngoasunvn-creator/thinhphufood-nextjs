'use client';

import { CartItem } from "@/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';


interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  setQuantity: (id: string, quantity: number) => void; // thêm dòng này
  clearCart: () => void;
  isMounted: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);



export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const setQuantity = (id: string, quantity: number) => {
  setCart(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    )
  );
};

  const [isMounted, setIsMounted] = useState(false);

  // ✅ Load cart từ localStorage (chỉ client)
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('thinhphu_cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Lỗi đọc localStorage:', error);
    } finally {
      setIsMounted(true);
    }
  }, []);

  // ✅ Lưu cart mỗi khi thay đổi
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('thinhphu_cart', JSON.stringify(cart));
  }, [cart, isMounted]);

  // ✅ Thêm sản phẩm
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);

      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ✅ Xóa sản phẩm
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // ✅ Tăng / giảm số lượng
  const updateQuantity = (id: string, amount: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + amount),
            }
          : item
      )
    );
  };

  // ✅ Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCart([]);
  };

  // ✅ Tổng số lượng
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        setQuantity,
        updateQuantity,
        clearCart,
        isMounted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Hook dùng giỏ hàng
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
};