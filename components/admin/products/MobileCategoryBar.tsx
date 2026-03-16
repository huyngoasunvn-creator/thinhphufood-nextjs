'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
}

export default function MobileCategoryBar({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  const handleFilter = (slug?: string) => {
  if (!slug) {
    router.push('/san-pham');
  } else {
    router.push(`/danh-muc/${slug}`);
  }
};

  return (
    <div className="lg:hidden sticky top-16 z-40 bg-white border-b border-slate-100 shadow-sm">

      <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar">

        {/* Nút filter icon */}
        <button
          className="flex items-center justify-center min-w-[40px] h-9 rounded-full border border-slate-200 bg-white shadow-sm"
        >
          <SlidersHorizontal className="h-4 w-4 text-slate-600" />
        </button>

        {/* Tất cả */}
        <button
          onClick={() => handleFilter()}
          className={`px-4 h-9 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            !activeCategory
              ? 'bg-green-600 text-white shadow'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          Tất cả
        </button>

        {/* Category list */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.slug)}
            className={`px-4 h-9 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-green-600 text-white shadow'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}