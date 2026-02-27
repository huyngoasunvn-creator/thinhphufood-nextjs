import Link from "next/link";

interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  slug: string;
}

export default function CategorySection({
  categories = [], // 🔒 fallback an toàn
}: {
  categories?: Category[];
}) {

  // 🔒 Làm sạch dữ liệu
  const safeCategories = Array.isArray(categories)
    ? categories.filter((c) => c && c.id)
    : [];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {safeCategories.map((category) => (
            <Link
              key={category.id}
              href={`/danh-muc/${category.slug || ''}`}
              className="group"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-white border border-slate-100">

                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.imageUrl || "/placeholder.jpg"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={category.name || ''}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <div className="absolute bottom-0 w-full p-4 text-white translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-lg font-semibold">
                    {category.name || ''}
                  </h3>
                </div>

              </div>
            </Link>
          ))}

          {safeCategories.length === 0 && (
            <p className="col-span-full text-center text-slate-400 text-sm italic">
              Chưa có danh mục.
            </p>
          )}

        </div>
      </div>
    </section>
  );
}