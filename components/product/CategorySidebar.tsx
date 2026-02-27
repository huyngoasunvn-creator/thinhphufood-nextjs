"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface Category {
  id: string;
  name: string;
  parentId?: string | null;
}

interface Props {
  categories: Category[];
}

export default function CategorySidebar({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const [openIds, setOpenIds] = useState<string[]>([]);

  // build tree
  const tree = useMemo(() => {
    const map = new Map<string, any>();

    categories.forEach((cat) => {
      map.set(cat.id, { ...cat, children: [] });
    });

    const roots: any[] = [];

    categories.forEach((cat) => {
      if (cat.parentId) {
        map.get(cat.parentId)?.children.push(map.get(cat.id));
      } else {
        roots.push(map.get(cat.id));
      }
    });

    return roots;
  }, [categories]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleSelect = (id: string) => {
    router.push(`/san-pham?category=${id}`);
  };

  const renderItem = (item: any, level = 0) => {
    const isOpen = openIds.includes(item.id);
    const isActive = activeCategory === item.id;
    const hasChildren = item.children.length > 0;

    return (
      <div key={item.id}>
        <div
          className={clsx(
            "flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-all",
            isActive
              ? "bg-green-600 text-white"
              : "hover:bg-gray-100"
          )}
          style={{ paddingLeft: 16 + level * 16 }}
          onClick={() =>
            hasChildren ? toggle(item.id) : handleSelect(item.id)
          }
        >
          <span>{item.name}</span>

          {hasChildren && (
            <ChevronDown
              size={16}
              className={clsx(
                "transition-transform duration-300",
                isOpen && "rotate-180"
              )}
            />
          )}
        </div>

        {hasChildren && (
          <div
            className={clsx(
              "overflow-hidden transition-all duration-300",
              isOpen ? "max-h-96" : "max-h-0"
            )}
          >
            {item.children.map((child: any) =>
              renderItem(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 space-y-2">
      <div
        className={clsx(
          "px-4 py-2 rounded-lg cursor-pointer",
          !activeCategory
            ? "bg-green-600 text-white"
            : "hover:bg-gray-100"
        )}
        onClick={() => router.push("/san-pham")}
      >
        Tất cả
      </div>

      {tree.map((item) => renderItem(item))}
    </div>
  );
}