
import React from 'react';
import { ShieldCheck, Truck } from 'lucide-react';
import { SiteConfig } from '../../types';

interface ProductTrustBadgesProps {
  config: SiteConfig;
}

const ProductTrustBadges: React.FC<ProductTrustBadgesProps> = ({ config }) => {
  if (!config.showTrustBadges) return null;

  return (
    <div className="grid grid-cols-2 gap-4 py-8 border-y border-slate-100">
      <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <ShieldCheck className="h-6 w-6 text-green-600" />
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase">{config.certLabel}</p>
          <p className="text-sm font-bold text-slate-900">{config.certValue}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <Truck className="h-6 w-6 text-green-600" />
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase">{config.shippingLabel}</p>
          <p className="text-sm font-bold text-slate-900">{config.shippingValue}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductTrustBadges;
