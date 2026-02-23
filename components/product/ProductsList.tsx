import { Product } from '@/types';

interface Props {
  products: Product[];
}

export default function ProductsList({ products }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded-xl">
          <h3 className="font-bold">{product.name}</h3>
          <p>{product.price}₫</p>
        </div>
      ))}
    </div>
  );
}
