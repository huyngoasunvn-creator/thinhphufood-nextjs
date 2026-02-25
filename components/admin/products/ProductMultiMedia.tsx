import React, { useState } from "react";
import { Plus } from "lucide-react";

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

  const handleAddImage = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    const newImages = [...images, trimmed];
    onChange(newImages, videoUrl);

    setUrlInput("");
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages, videoUrl);
  };

  return (
    <div className="space-y-4">
      <label className="block font-semibold">
        Hình ảnh sản phẩm
      </label>

      {/* Input URL */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Dán URL hình ảnh..."
          className="flex-1 px-4 py-2 border rounded-xl"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <button
          type="button"
          onClick={handleAddImage}
          className="bg-green-600 text-white px-4 rounded-xl"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden border"
            >
              <img
                src={img}
                alt=""
                className="w-full h-24 object-cover"
              />

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
    </div>
  );
}