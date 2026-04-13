import crypto from "crypto";
import { NextResponse } from "next/server";

const ALLOWED_FOLDERS = new Set(["products", "news", "banners", "content"]);

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Thiếu cấu hình Cloudinary. Vui lòng thêm CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY và CLOUDINARY_API_SECRET vào biến môi trường.",
    );
  }

  return { cloudName, apiKey, apiSecret };
}

function sanitizeFolder(folder: string) {
  return ALLOWED_FOLDERS.has(folder) ? folder : "content";
}

function sanitizePublicId(fileName: string) {
  const baseName = fileName.replace(/\.[^.]+$/, "");

  return baseName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const rawFolder = String(formData.get("folder") || "content");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Không tìm thấy file tải lên." },
        { status: 400 },
      );
    }

    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
    const folder = `thinhphufood/${sanitizeFolder(rawFolder)}`;
    const timestamp = Math.floor(Date.now() / 1000);
    const publicId = `${Date.now()}-${sanitizePublicId(file.name) || "image"}`;

    const signaturePayload = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(signaturePayload)
      .digest("hex");

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("api_key", apiKey);
    uploadData.append("timestamp", String(timestamp));
    uploadData.append("folder", folder);
    uploadData.append("public_id", publicId);
    uploadData.append("signature", signature);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: uploadData,
      },
    );

    const result = await uploadResponse.json();

    if (!uploadResponse.ok || !result?.secure_url) {
      return NextResponse.json(
        {
          error:
            result?.error?.message ||
            "Cloudinary không nhận được ảnh tải lên.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      bytes: result.bytes,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tải ảnh lên Cloudinary.",
      },
      { status: 500 },
    );
  }
}
