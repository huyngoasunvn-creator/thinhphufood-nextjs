'use client';

import { useEffect, useState } from 'react';
import { NewsPost } from '@/types';
import { db } from '@/services/firebase';
import {
  collection,
  getDocs,
  setDoc,
  doc
} from 'firebase/firestore';

export const useNews = () => {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const snapshot = await getDocs(collection(db, 'news'));

      const data: NewsPost[] = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
      })) as NewsPost[];

      setNews(data);
      setLoading(false);
    };

    fetchNews();
  }, []);

  const saveNews = async (updated: NewsPost[]) => {
    setNews(updated);

    // cập nhật lại từng document
    for (const item of updated) {
      await setDoc(doc(db, 'news', item.id), item);
    }
  };

  return { news, saveNews, loading };
};