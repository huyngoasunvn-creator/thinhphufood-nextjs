import React from "react";
import {
  Leaf,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Star,
  Heart,
  CheckCircle,
} from "lucide-react";
import { Commitment } from "@/types";

const ICON_MAP: Record<string, any> = {
  Leaf,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Star,
  Heart,
  CheckCircle,
};

interface FeaturesProps {
  commitments: Commitment[];
}

const Features: React.FC<FeaturesProps> = ({ commitments }) => {
  return (
    <section className="py-6 md:py-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {commitments.map((item) => {
            const IconComp = ICON_MAP[item.iconName] || ShieldCheck;

            return (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2.5 md:p-3 rounded-xl hover:bg-slate-50 transition-all duration-200"
              >
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 flex-shrink-0">
                  <IconComp className="h-4 w-4 md:h-5 md:w-5" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 text-xs md:text-sm leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[10px] md:text-xs text-slate-500 leading-tight mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;