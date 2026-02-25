import React, { useState } from "react";
import { Link as LinkIcon, Plus, X, Star, Image as ImageIcon } from "lucide-react";

interface ProductMultiMediaProps {
  mainImage: string;
  otherImages: string[];
  onMainImageChange: (url: string) => void;
  onOtherImagesChange: (urls: string[]) => void;
}

const ProductMultiMedia: React.FC<ProductMultiMediaProps> = ({
  mainImage,
  otherImages,
  onMainImageChange,
  onOtherImagesChange,
}) => {
  const [urlInput, setUrlInput] = useState("");
  const [mode, setMode] = useState<"upload" | "url">("url");

  const allImages = [mainImage, ...otherImages].filter(Boolean);

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    if (!mainImage) {
      onMainImageChange(trimmed);
    } else {
      onOtherImagesChange([...otherImages, trimmed]);
    }

    setUrlInput("");
  };

  const removeImage = (urlToRemove: string) => {
    if (urlToRemove === mainImage) {
      if (otherImages.length > 0) {
        onMainImageChange(otherImages[0]);
        onOtherImagesChange(otherImages.slice(1));
      } else {
        onMainImageChange("");
      }
    } else {
      onOtherImagesChange(otherImages.filter((url) => url !== urlToRemove));
    }
  };

  const setAsMain = (url: string) => {
    if (url === mainImage) return;

    const newOthers = [mainImage, ...otherImages.filter((u) => u !== url)].filter(Boolean);
    onMainImageChange(url);
    onOtherImagesChange(newOthers as string[]);
  };

  return (
    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          HÌNH ẢNH SẢN PHẨM
        </label>

        <div className="flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
              mode === "upload"
                ? "bg-green-600 text-white"
                : "text-slate-400"
            }`}
          >
            TẢI LÊN
          </button>

          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
              mode === "url"
                ? "bg-green-600 text-white"
                : "text-slate-400"
            }`}
          >
            DÁN LINK
          </button>
        </div>
      </div>

      {/* Input Area */}
      {mode === "url" ? (
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <LinkIcon className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Dán URL hình ảnh Cloudinary..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none text-xs font-mono focus:ring-2 focus:ring-green-500"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddUrl())
              }
            />
          </div>

          <button
            type="button"
            onClick={handleAddUrl}
            className="bg-green-600 text-white p-3 rounded-2xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="py-10 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-300">
          <ImageIcon className="h-10 w-10 mb-2 opacity-20" />
          <p className="text-[10px] font-black uppercase tracking-widest">
            Bạn đang dùng Cloudinary → chọn tab DÁN LINK
          </p>
        </div>
      )}

      {/* Gallery */}
      {allImages.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {allImages.map((url, idx) => (
            <div
              key={idx}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all group ${
                url === mainImage
                  ? "border-green-500 shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <img
                src={url}
                className="w-full h-full object-cover"
                alt=""
              />

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1">
                <button
                  type="button"
                  onClick={() => setAsMain(url)}
                  className={`p-1.5 rounded-lg ${
                    url === mainImage
                      ? "bg-yellow-400 text-white"
                      : "bg-white text-slate-400 hover:text-yellow-500"
                  }`}
                >
                  <Star className="h-3 w-3 fill-current" />
                </button>

                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="p-1.5 bg-white text-slate-400 hover:text-red-500 rounded-lg"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>

              {url === mainImage && (
                <div className="absolute top-0 left-0 bg-green-500 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded-br-lg shadow-sm">
                  Chính
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-300">
          <ImageIcon className="h-10 w-10 mb-2 opacity-20" />
          <p className="text-[10px] font-black uppercase tracking-widest">
            Chưa có hình ảnh
          </p>
        </div>
      )}

      {/* Info */}
      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start space-x-3">
        <Star className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
        <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
          Mẹo: Bạn nên chọn 1 ảnh đẹp nhất làm ảnh chính để hiển thị ngoài danh
          sách sản phẩm. Các ảnh khác sẽ xuất hiện trong slide chi tiết.
        </p>
      </div>
    </div>
  );
};

export default ProductMultiMedia;