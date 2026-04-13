import React, { useEffect, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { PopupConfig } from '@/types';

interface PopupProps {
  config: PopupConfig;
}

const Popup: React.FC<PopupProps> = ({ config }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!config.isActive) return;

    const hasSeenPopup = sessionStorage.getItem('thinhphufood_has_seen_popup');
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, config.delay * 1000);

    return () => clearTimeout(timer);
  }, [config]);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem('thinhphufood_has_seen_popup', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={closePopup}
      />

      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-md rounded-full text-slate-500 hover:text-slate-900 transition-colors shadow-sm"
          aria-label="Đóng popup"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col">
          {config.imageUrl && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={config.imageUrl}
                alt={config.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 sm:p-10 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-4">
              {config.title}
            </h3>
            <p className="text-slate-500 leading-relaxed mb-8">
              {config.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={config.link}
                onClick={closePopup}
                className="inline-flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-green-100 active:scale-95 group"
              >
                <span>{config.buttonText}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={closePopup}
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Đóng popup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
