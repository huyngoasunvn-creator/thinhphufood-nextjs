import { Product } from '@/types';

interface Props {
  products?: Product[];
}

export default function ProductsList({ products }: Props) {
  if (!products || products.length === 0) {
    return <p>Chưa có sản phẩm</p>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {products
        .filter(Boolean) // loại undefined
        .map(product => (
          <div key={product.id} className="border p-4 rounded-xl">
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.price}₫</p>
          </div>
        ))}
    </div>
  );
}
