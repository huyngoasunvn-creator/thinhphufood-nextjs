
import React, { useMemo } from 'react';
// Use next/navigation and next/link instead of react-router-dom
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Product, SiteConfig } from '../types';
import SEOManager from '../components/common/SEO';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductTrustBadges from '../components/product/ProductTrustBadges';
import ProductActionPanel from '../components/product/ProductActionPanel';

interface ProductDetailProps {
  products: Product[];
  siteConfig: SiteConfig;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, siteConfig, onAddToCart }) => {
  const { slug } = useParams() as { slug: string };
  
  const product = useMemo(() => 
    products.find(p => p.slug === slug), 
  [products, slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Sản phẩm không tồn tại</h2>
          <Link href="/products" className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">Quay lại cửa hàng</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-in fade-in duration-500">
      <SEOManager 
        title={product.name} 
        description={product.shortDescription || product.description}
        image={product.image}
        type="product"
        data={product}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/products" className="inline-flex items-center text-slate-500 hover:text-green-600 mb-8 transition-colors font-medium">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Quay lại cửa hàng</span>
        </Link>

        {/* Main Product Section */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: Media */}
            <ProductGallery product={product} />

            {/* Right: Basic Info & Actions */}
            <div className="p-8 lg:p-12 flex flex-col justify-between space-y-10">
              <div className="space-y-10">
                <ProductInfo product={product} siteConfig={siteConfig} />
                <ProductTrustBadges config={siteConfig} />
              </div>
              <ProductActionPanel product={product} onAddToCart={onAddToCart} />
            </div>
          </div>
        </div>

        {/* Detailed Description Section */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-8 lg:p-16">
          <header className="flex items-center space-x-4 mb-10 border-b border-slate-100 pb-6">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Thông tin chi tiết</h2>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-tight">Chi tiết về nguồn gốc, đặc tính và cách bảo quản</p>
            </div>
          </header>

          <div 
            className="prose prose-lg max-w-none prose-slate prose-img:rounded-3xl prose-a:text-green-600 text-slate-600 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
