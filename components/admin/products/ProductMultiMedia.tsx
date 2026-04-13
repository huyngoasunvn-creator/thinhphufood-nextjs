import React, { useState } from "react";
import {
  Plus,
  Upload,
  Loader2,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";
import { uploadImage } from "@/services/storage";

interface Props {
  images: string[];
  videoUrl?: string;
  onChange: (images: string[], videoUrl?: string) => void;
}

export default function ProductMultiMedia({
  images = [],
  videoUrl = "",
  onChange,
}: Props) {
  const [urlInput, setUrlInput] = useState("");
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [uploading, setUploading] = useState(false);

  const handleAddImage = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    onChange([...images, trimmed], videoUrl);
    setUrlInput("");
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, currentIndex) => currentIndex !== index);
    onChange(newImages, videoUrl);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    try {
      setUploading(true);

      const uploadedUrls: string[] = [];
      for (const file of files) {
        const url = await uploadImage(file, "products");
        uploadedUrls.push(url);
      }

      onChange([...images, ...uploadedUrls], videoUrl);
    } catch (error) {
      console.error("Product image upload error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Không thể tải ảnh sản phẩm lên Cloudinary.",
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block font-semibold">Hình ảnh sản phẩm</label>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
              mode === "upload"
                ? "bg-green-600 text-white"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Tải từ máy
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
              mode === "url"
                ? "bg-green-600 text-white"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Dán link
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Ảnh tải từ máy sẽ được nén và thu nhỏ trước khi đưa lên Cloudinary để
        tiết kiệm dung lượng lưu trữ.
      </p>

      {mode === "upload" ? (
        <label className="flex flex-col items-center justify-center gap-2 w-full px-4 py-5 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
          {uploading ? (
            <>
              <Loader2 className="h-5 w-5 text-green-600 animate-spin" />
              <span className="text-sm font-bold text-slate-700">
                Đang tối ưu và tải ảnh lên...
              </span>
            </>
          ) : (
            <>
              <Upload className="h-5 w-5 text-green-600" />
              <span className="text-sm font-bold text-slate-700">
                Chọn một hoặc nhiều ảnh từ máy tính
              </span>
            </>
          )}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      ) : (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Dán URL hình ảnh..."
              className="w-full pl-10 pr-4 py-2.5 border rounded-xl"
              value={urlInput}
              onChange={(event) => setUrlInput(event.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={handleAddImage}
            className="bg-green-600 text-white px-4 rounded-xl"
          >
            <Plus size={18} />
          </button>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, index) => (
            <div
              key={`${img}-${index}`}
              className="relative rounded-xl overflow-hidden border bg-white"
            >
              <img src={img} alt="" className="w-full h-24 object-cover" />

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 rounded"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="h-28 rounded-2xl border border-dashed border-slate-200 bg-white flex flex-col items-center justify-center text-slate-400">
          <ImageIcon className="h-8 w-8 mb-2" />
          <span className="text-xs font-semibold">
            Chưa có ảnh sản phẩm nào
          </span>
        </div>
      )}
    </div>
  );
}
