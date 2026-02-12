
import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
// Use next/link instead of react-router-dom
import Link from 'next/link';
import { PopupConfig } from '../../types';

interface PopupProps {
  config: PopupConfig;
}

const Popup: React.FC<PopupProps> = ({ config }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!config.isActive) return;

    // Chỉ hiển thị 1 lần mỗi phiên làm việc (session)
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
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closePopup}></div>
      
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col">
          {config.imageUrl && (
            <div className="aspect-video w-full overflow-hidden">
              <img src={config.imageUrl} alt={config.title} className="w-full h-full object-cover" />
            </div>
          )}
          
          <div className="p-8 sm:p-10 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-4">{config.title}</h3>
            <p className="text-slate-500 leading-relaxed mb-8">{config.description}</p>
            
            <Link 
              href={config.link} 
              onClick={closePopup}
              className="inline-flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-green-100 active:scale-95 group w-full sm:w-auto"
            >
              <span>{config.buttonText}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
