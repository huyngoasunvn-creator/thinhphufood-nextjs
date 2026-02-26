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
    <section className="py-8 md:py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {commitments.map((item) => {
            const IconComp = ICON_MAP[item.iconName] || ShieldCheck;

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-4 p-3 md:p-4 rounded-2xl hover:bg-slate-50 transition-colors"
              >
                <div className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-green-50 text-green-600 flex-shrink-0">
                  <IconComp className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 text-xs md:text-base">
                    {item.title}
                  </h3>
                  <p className="hidden xs:block text-[10px] md:text-sm text-slate-500 mt-1 leading-snug">
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