"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

/* ================= NORMALIZE (BỎ DẤU) ================= */
const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

interface Category {
  id: string;
  name: string;
  parentId?: string | null;
}

interface Props {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
  initialSearch?: string;
}

interface CategoryNode extends Category {
  children: CategoryNode[];
}

export default function ProductsPage({
  products = [],
  categories = [],
  initialCategory = "all",
  initialSearch = "",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategory !== "all" ? initialCategory : null
  );

  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  /* ================= DEBOUNCE SEARCH ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  /* ================= SYNC SEARCH TO URL ================= */
  useEffect(() => {
  const params = new URLSearchParams(searchParams.toString());

  if (debouncedSearch.trim()) {
    params.set("q", debouncedSearch);
  } else {
    params.delete("q");
  }

  router.replace(`/san-pham?${params.toString()}`, { scroll: false });

}, [debouncedSearch]);

  /* ================= CATEGORY TREE ================= */

  const categoryTree: CategoryNode[] = useMemo(() => {
    const map = new Map<string, CategoryNode>();

    categories.forEach((cat) => {
      map.set(cat.id, { ...cat, children: [] });
    });

    const roots: CategoryNode[] = [];

    map.forEach((node) => {
      if (node.parentId && map.has(node.parentId)) {
        map.get(node.parentId)!.children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }, [categories]);

  /* ================= AUTO OPEN CATEGORY ================= */

  useEffect(() => {
    if (!activeCategory) return;

    const parents = new Set<string>();

    const findParents = (nodes: CategoryNode[], chain: string[] = []) => {
      for (const node of nodes) {
        if (node.id === activeCategory) {
          chain.forEach((id) => parents.add(id));
        }
        if (node.children.length > 0) {
          findParents(node.children, [...chain, node.id]);
        }
      }
    };

    findParents(categoryTree);
    setOpenCategories(parents);
  }, [activeCategory, categoryTree]);

  /* ================= GET ALL CHILD IDS ================= */

  const getAllChildIds = (id: string): string[] => {
    const ids: string[] = [];

    const find = (nodes: CategoryNode[]) => {
      for (const node of nodes) {
        if (node.id === id) {
          collect(node);
        } else {
          find(node.children);
        }
      }
    };

    const collect = (node: CategoryNode) => {
      ids.push(node.id);
      node.children.forEach(collect);
    };

    find(categoryTree);
    return ids;
  };

  /* ================= FILTER PRODUCTS ================= */

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // FILTER CATEGORY
    if (activeCategory) {
      const ids = new Set(getAllChildIds(activeCategory));
list = list.filter((p) => ids.has(p.categoryId));
    }

    // FILTER SEARCH
    if (debouncedSearch.trim()) {
      const keyword = normalizeText(debouncedSearch);

      list = list.filter((p) => {
        const name = normalizeText(p.name);
        const description = normalizeText(p.description || "");

        return (
          name.includes(keyword) ||
          description.includes(keyword)
        );
      });
    }

    // PRIORITY BESTSELLER
    list.sort((a, b) => {
      if (a.isBestseller && !b.isBestseller) return -1;
      if (!a.isBestseller && b.isBestseller) return 1;
      return 0;
    });

    return list;
  }, [products, activeCategory, debouncedSearch, categoryTree]);

  /* ================= HANDLERS ================= */

  const handleCategoryChange = (id: string | null) => {
    setActiveCategory(id);
    setMobileCategoryOpen(false);

    const params = new URLSearchParams(searchParams.toString());

    if (!id) {
      params.delete("category");
    } else {
      params.set("category", id);
    }

    router.push(`/san-pham?${params.toString()}`, { scroll: false });
  };

  const toggleOpen = (id: string) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  /* ================= RENDER CATEGORY ================= */

  const renderCategories = (nodes: CategoryNode[], level = 0) => {
    return nodes.map((node) => {
      const isOpen = openCategories.has(node.id);
      const isActive = activeCategory === node.id;

      return (
        <div key={node.id} className="mb-1">
          <div
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition ${
              isActive
                ? "bg-green-600 text-white"
                : "hover:bg-green-50"
            }`}
            style={{ paddingLeft: `${12 + level * 14}px` }}
          >
            <span
              onClick={() => handleCategoryChange(node.id)}
              className="flex-1"
            >
              {node.name}
            </span>

            {node.children.length > 0 && (
              <button
                onClick={() => toggleOpen(node.id)}
                className="text-xs ml-2"
              >
                {isOpen ? "−" : "+"}
              </button>
            )}
          </div>

          {isOpen && node.children.length > 0 && (
            <div className="mt-1">
              {renderCategories(node.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10 flex flex-col lg:flex-row gap-6 lg:gap-8">

      {/* MOBILE CATEGORY */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
          className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold"
        >
          Danh mục sản phẩm
        </button>

        {mobileCategoryOpen && (
          <div className="mt-3 bg-white border rounded-xl p-3 shadow-md max-h-96 overflow-y-auto">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`mb-3 w-full text-left px-3 py-2 rounded-lg text-sm ${
                !activeCategory
                  ? "bg-green-600 text-white"
                  : "bg-slate-50"
              }`}
            >
              Tất cả
            </button>

            {renderCategories(categoryTree)}
          </div>
        )}
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:block w-64">
        <h3 className="text-xs uppercase font-bold text-slate-400 mb-4">
          Danh mục
        </h3>

        <button
          onClick={() => handleCategoryChange(null)}
          className={`mb-4 w-full text-left px-4 py-2 rounded-xl font-semibold ${
            !activeCategory
              ? "bg-green-600 text-white"
              : "bg-white border"
          }`}
        >
          Tất cả
        </button>

        {renderCategories(categoryTree)}
      </aside>

      {/* MAIN */}
      <main className="flex-1">

        {/* SEARCH */}
        <div className="mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm sản phẩm..."
            className="w-full border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <p className="text-slate-500">Không có sản phẩm phù hợp.</p>
        ) : (
          <>
            <p className="text-sm font-medium text-green-700 mb-3">
              {filteredProducts.length} sản phẩm
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
  />
))}
            </div>
          </>
        )}

      </main>
    </div>
  );
}