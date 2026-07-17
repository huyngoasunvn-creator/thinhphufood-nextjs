const DEFAULT_MAX_DIMENSION = 1600;
const WEBP_QUALITY = 0.7;
const DEFAULT_MAX_FILE_SIZE_MB = 8;

type UploadFolder = "products" | "news" | "banners" | "content";

async function readImageDimensions(
  file: File,
): Promise<{ width: number; height: number }> {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Không thể đọc kích thước ảnh."));
      img.src = objectUrl;
    });

    return {
      width: image.naturalWidth || image.width,
      height: image.naturalHeight || image.height,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  const { width, height } = await readImageDimensions(file);
  const scale = Math.min(1, DEFAULT_MAX_DIMENSION / Math.max(width, height));
  const targetWidth = Math.max(1, Math.round(width * scale));
  const targetHeight = Math.max(1, Math.round(height * scale));
  const targetMimeType = "image/webp";

  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const context = canvas.getContext("2d");
  if (!context) {
    imageBitmap.close();
    throw new Error("Không thể xử lý ảnh để chuyển sang WebP.");
  }

  context.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);
  imageBitmap.close();

  const compressedBlob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, targetMimeType, WEBP_QUALITY);
  });

  if (!compressedBlob || compressedBlob.type !== targetMimeType) {
    throw new Error("Trình duyệt không hỗ trợ chuyển ảnh sang WebP.");
  }

  const safeName = file.name.replace(/\.[^.]+$/, "");

  return new File([compressedBlob], `${safeName}.webp`, {
    type: targetMimeType,
    lastModified: Date.now(),
  });
}

function validateFile(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Chỉ hỗ trợ tải lên tệp hình ảnh.");
  }

  const maxBytes = DEFAULT_MAX_FILE_SIZE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`Ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn ${DEFAULT_MAX_FILE_SIZE_MB}MB.`);
  }
}

export async function uploadImage(
  file: File,
  folder: UploadFolder = "content",
): Promise<string> {
  validateFile(file);

  const optimizedFile = await compressImage(file);

  const formData = new FormData();
  formData.append("file", optimizedFile);
  formData.append("folder", folder);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.url) {
    throw new Error(data?.error || "Không thể tải ảnh lên Cloudinary.");
  }

  return data.url as string;
}
