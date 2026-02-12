
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // ✅ sửa ở đây
import { storage } from "./firebase";


/**
 * Nén ảnh trước khi upload để tiết kiệm băng thông và tăng tốc độ
 */
const compressImage = async (file: File): Promise<Blob | File> => {
  // Chỉ nén nếu là định dạng ảnh phổ biến
  if (!file.type.startsWith('image/')) return file;
  
  // Không nén ảnh GIF (để giữ animation)
  if (file.type === 'image/gif') return file;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200; // Chiều rộng tối đa cho ảnh web
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = (MAX_WIDTH / width) * height;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(file);

        ctx.drawImage(img, 0, 0, width, height);
        
        // Chuyển sang định dạng JPEG với chất lượng 0.7 để tối ưu dung lượng
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          0.7
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

/**
 * Upload hình ảnh và trả về URL
 * @param file File từ input
 * @param folder Thư mục lưu trữ (products, news, banners...)
 */
export const uploadImage = async (file: File, folder: string): Promise<string> => {
  // Thực hiện nén ảnh trước khi tải lên
  const compressedFile = await compressImage(file);
  
  const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  const storageRef = ref(storage, `${folder}/${fileName}`);
  
  // Upload file đã nén
  const snapshot = await uploadBytes(storageRef, compressedFile);
  const downloadURL = await getDownloadURL(snapshot.ref);
  
  return downloadURL;
};
