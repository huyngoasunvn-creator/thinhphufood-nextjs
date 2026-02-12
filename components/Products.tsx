import React from 'react';
import ProductCard from './ProductCard';

interface ProductsProps {
  products: any[];
  categories: any[];
  onAddToCart: (product: any) => void;
}

const Products: React.FC<ProductsProps> = ({
  products,
  categories,
  onAddToCart,
}) => {
  if (!products) return null;

  return (
    <div className="container mx-auto p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default Products;
