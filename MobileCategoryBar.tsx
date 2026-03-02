'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
}

export default function MobileCategoryBar({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  const handleFilter = (id?: string) => {
    if (!id) {
      router.push('/san-pham');
    } else {
      router.push(`/san-pham?category=${id}`);
    }
  };

  return (
    <div className="lg:hidden bg-white border-b border-slate-100 sticky top-16 z-30">
      <div className="flex overflow-x-auto no-scrollbar px-4 py-3 gap-3">

        {/* Tất cả */}
        <button
          onClick={() => handleFilter()}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
            !activeCategory
              ? 'bg-green-600 text-white'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          Tất cả
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
              activeCategory === cat.id
                ? 'bg-green-600 text-white'
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