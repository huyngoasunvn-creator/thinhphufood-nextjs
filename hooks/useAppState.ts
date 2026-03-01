'use client';

import { useProducts } from './useProducts';
import { useCart } from './useCart';
import { useOrders } from './useOrders';
import { useSiteSettings } from './useSiteSettings';
import { useContactMessages } from './useContactMessages';
import { useNews } from './useNews'; // 👈 thêm

export const useAppState = () => {
  const productsState = useProducts();
  const cartState = useCart();
  const ordersState = useOrders();
  const siteSettingsState = useSiteSettings();
  const contactMessagesState = useContactMessages();
  const newsState = useNews(); // 👈 thêm

  return {
    ...productsState,
    ...cartState,
    ...ordersState,
    ...siteSettingsState,
    ...contactMessagesState,
    ...newsState, // 👈 thêm
  };
};