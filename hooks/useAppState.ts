'use client';

import { useProducts } from './useProducts';
import { useOrders } from './useOrders';
import { useSiteSettings } from './useSiteSettings';
import { useContactMessages } from './useContactMessages';
import { useNews } from './useNews';
import { useEventEmbed } from './useEventEmbed';

export const useAppState = () => {
  const productsState = useProducts();
  const ordersState = useOrders();
  const siteSettingsState = useSiteSettings();
  const contactMessagesState = useContactMessages();
  const newsState = useNews();
  const eventEmbedState = useEventEmbed(); // ✅ thêm

  return {
    ...productsState,
    ...ordersState,
    ...siteSettingsState,
    ...contactMessagesState,
    ...newsState,
    ...eventEmbedState, // ✅ thêm
  };
};