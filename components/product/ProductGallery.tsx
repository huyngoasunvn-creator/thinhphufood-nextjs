
import React, { useState, useMemo } from 'react';
import { PlayCircle } from 'lucide-react';
import { Product } from '../../types';

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const [activeImg, setActiveImg] = useState<string | null>(null);

  const allImages = useMemo(() => {
    return [product.image, ...(product.images || [])];
  }, [product]);

  const currentShowImage = activeImg || product.image;

  return (
    <div className="p-8 lg:p-12 bg-slate-50/50 border-r border-slate-100">
      <div className="sticky top-24 space-y-6">
        <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 bg-white group relative">
          <img 
            src={currentShowImage} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.videoUrl && (
            <a 
              href={product.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl flex items-center space-x-2 text-red-600 font-bold shadow-lg hover:scale-105 transition-all"
            >
              <PlayCircle className="h-6 w-6" />
              <span>Xem Video</span>
            </a>
          )}
        </div>
        
        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex flex-wrap gap-3">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                  currentShowImage === img ? 'border-green-600 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
