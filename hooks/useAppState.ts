'use client';

import { useProducts } from './useProducts';
import { useOrders } from './useOrders';
import { useSiteSettings } from './useSiteSettings';
import { useContactMessages } from './useContactMessages';
import { useNews } from './useNews';

export const useAppState = () => {
  const productsState = useProducts();
  const ordersState = useOrders();
  const siteSettingsState = useSiteSettings();
  const contactMessagesState = useContactMessages();
  const newsState = useNews();

  return {
    ...productsState,
    ...ordersState,
    ...siteSettingsState,
    ...contactMessagesState,
    ...newsState,
  };
};