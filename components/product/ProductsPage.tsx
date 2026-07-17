"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
};

interface Category {
  id: string;
  name: string;
  slug?: string;
  parentId?: string | null;
}

interface Props {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
  initialSearch?: string;
  basePath?: string;
  allCategoriesPath?: string;
  categoryPathPrefix?: string;
  categoryTitle?: string;
  emptyMessage?: string;
}

interface CategoryNode extends Category {
  children: CategoryNode[];
}

export default function ProductsPage({
  products = [],
  categories = [],
  initialCategory = "all",
  initialSearch = "",
  basePath = "/san-pham",
  allCategoriesPath = basePath,
  categoryPathPrefix,
  categoryTitle = "Danh mục",
  emptyMessage = "Không có sản phẩm phù hợp.",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategory !== "all" ? initialCategory : null,
  );
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  useEffect(() => {
    const currentCategoryFromUrl = searchParams.get("category");

    if (currentCategoryFromUrl) {
      setActiveCategory(currentCategoryFromUrl);
      return;
    }

    setActiveCategory(initialCategory !== "all" ? initialCategory : null);
  }, [initialCategory, searchParams]);

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const keyword = normalizeText(search);
    const result = products
      .filter((product) => normalizeText(product.name).includes(keyword))
      .slice(0, 5);

    setSuggestions(result);
  }, [search, products]);

  useEffect(() => {
    setSearch(initialSearch);
    setDebouncedSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    const q = searchParams.get("q");

    if (q) {
      setSearch(q);
      setDebouncedSearch(q);
      return;
    }

    if (pathname.startsWith("/tim-kiem/")) {
      const keyword = decodeURIComponent(pathname.replace("/tim-kiem/", "")).replaceAll(
        "-",
        " ",
      );

      setSearch(keyword);
      setDebouncedSearch(keyword);
      return;
    }

    setSearch(initialSearch);
    setDebouncedSearch(initialSearch);
  }, [initialSearch, pathname, searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (pathname.startsWith("/tim-kiem")) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch.trim()) {
      params.set("q", debouncedSearch);
    } else {
      params.delete("q");
    }

    const queryString = params.toString();
    router.replace(queryString ? `${basePath}?${queryString}` : basePath, {
      scroll: false,
    });
  }, [basePath, debouncedSearch, pathname, router, searchParams]);

  const categoryTree: CategoryNode[] = useMemo(() => {
    const map = new Map<string, CategoryNode>();

    categories.forEach((category) => {
      map.set(category.id, { ...category, children: [] });
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

  useEffect(() => {
    if (!activeCategory) {
      setOpenCategories(new Set());
      return;
    }

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

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory) {
      const ids = new Set(getAllChildIds(activeCategory));
      list = list.filter((product) => ids.has(product.menuId || ""));
    }

    if (debouncedSearch.trim()) {
      const keyword = normalizeText(debouncedSearch.replaceAll("-", " "));

      list = list.filter((product) => {
        const name = normalizeText(product.name || "");
        const description = normalizeText(product.description || "");
        const category = normalizeText(product.category || "");

        return (
          name.includes(keyword) ||
          description.includes(keyword) ||
          category.includes(keyword)
        );
      });
    }

    return list.sort((first, second) => {
      if (first.isBestseller && !second.isBestseller) return -1;
      if (!first.isBestseller && second.isBestseller) return 1;
      return 0;
    });
  }, [products, activeCategory, debouncedSearch, categoryTree]);

  const handleCategoryChange = (id: string | null) => {
    setActiveCategory(id);
    setMobileCategoryOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    let targetPath = allCategoriesPath;

    if (id && categoryPathPrefix) {
      const category = categories.find((item) => item.id === id);

      if (category?.slug) {
        targetPath = `${categoryPathPrefix}/${category.slug}`;
      } else {
        params.set("category", id);
      }
    } else if (id) {
      params.set("category", id);
    }

    const queryString = params.toString();
    router.push(queryString ? `${targetPath}?${queryString}` : targetPath, {
      scroll: false,
    });
  };

  const toggleOpen = (id: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const renderCategories = (nodes: CategoryNode[], level = 0) => {
    return nodes.map((node) => {
      const isOpen = openCategories.has(node.id);
      const isCurrent = activeCategory === node.id;

      return (
        <div key={node.id} className="mb-1">
          <div
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition ${
              isCurrent ? "bg-green-600 text-white" : "hover:bg-green-50"
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
                type="button"
                onClick={() => toggleOpen(node.id)}
                className="text-xs ml-2"
              >
                {isOpen ? "−" : "+"}
              </button>
            )}
          </div>

          {isOpen && node.children.length > 0 && (
            <div className="mt-1">{renderCategories(node.children, level + 1)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10 flex flex-col lg:flex-row gap-6 lg:gap-8">
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
          className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold"
        >
          {categoryTitle}
        </button>

        {mobileCategoryOpen && (
          <div className="mt-3 bg-white border rounded-xl p-3 shadow-md max-h-96 overflow-y-auto">
            <button
              type="button"
              onClick={() => handleCategoryChange(null)}
              className={`mb-3 w-full text-left px-3 py-2 rounded-lg text-sm ${
                !activeCategory ? "bg-green-600 text-white" : "bg-slate-50"
              }`}
            >
              Tất cả
            </button>

            {renderCategories(categoryTree)}
          </div>
        )}
      </div>

      <aside className="hidden lg:block w-64">
        <h3 className="text-xs uppercase font-bold text-slate-400 mb-4">
          {categoryTitle}
        </h3>

        <button
          type="button"
          onClick={() => handleCategoryChange(null)}
          className={`mb-4 w-full text-left px-4 py-2 rounded-xl font-semibold ${
            !activeCategory ? "bg-green-600 text-white" : "bg-white border"
          }`}
        >
          Tất cả
        </button>

        {renderCategories(categoryTree)}
      </aside>

      <main className="flex-1">
        <div className="mb-4 relative">
          <input
            value={search}
            onFocus={() => setShowSuggest(true)}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm sản phẩm..."
            className="w-full border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {showSuggest && suggestions.length > 0 && (
            <div className="absolute bg-white border rounded-xl shadow w-full mt-1 z-50">
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="w-full text-left flex items-center gap-2 p-3 hover:bg-gray-100"
                  onClick={() => {
                    setShowSuggest(false);
                    router.push(`/san-pham/${item.slug}`);
                  }}
                >
                  <span className="text-sm">{item.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-slate-500">{emptyMessage}</p>
        ) : (
          <>
            <p className="text-sm font-medium text-green-700 mb-3">
              {filteredProducts.length} sản phẩm
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
