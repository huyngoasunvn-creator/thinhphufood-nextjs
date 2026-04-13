"use client";

import { useState } from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
}

interface Props {
  categories: Category[];
}

export default function CategoriesSidebar({ categories }: Props) {
  const [openLevel1, setOpenLevel1] = useState<string | null>(null);
  const [openLevel2, setOpenLevel2] = useState<string | null>(null);

  const level1 = categories.filter((c) => !c.parentId);

  const getChildren = (parentId: string) =>
    categories.filter((c) => c.parentId === parentId);

  return (
    <div className="space-y-2">

      {level1.map((cat1) => {
        const childrenLv2 = getChildren(cat1.id);

        return (
          <div key={cat1.id}>

            {/* LEVEL 1 */}
            <div className="flex justify-between items-center">
              <Link href={`/danh-muc/${cat1.slug}`}>
                {cat1.name}
              </Link>

              {childrenLv2.length > 0 && (
                <button
                  onClick={() =>
                    setOpenLevel1(openLevel1 === cat1.id ? null : cat1.id)
                  }
                >
                  +
                </button>
              )}
            </div>

            {/* LEVEL 2 */}
            {openLevel1 === cat1.id &&
              childrenLv2.map((cat2) => {
                const childrenLv3 = getChildren(cat2.id);

                return (
                  <div key={cat2.id} className="ml-4">

                    <div className="flex justify-between items-center">
                      <Link href={`/danh-muc/${cat2.slug}`}>
                        {cat2.name}
                      </Link>

                      {childrenLv3.length > 0 && (
                        <button
                          onClick={() =>
                            setOpenLevel2(
                              openLevel2 === cat2.id ? null : cat2.id
                            )
                          }
                        >
                          +
                        </button>
                      )}
                    </div>

                    {/* LEVEL 3 */}
                    {openLevel2 === cat2.id &&
                      childrenLv3.map((cat3) => (
                        <div key={cat3.id} className="ml-4">
                          <Link href={`/danh-muc/${cat3.slug}`}>
                            {cat3.name}
                          </Link>
                        </div>
                      ))}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}