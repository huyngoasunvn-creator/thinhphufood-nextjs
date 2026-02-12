
import { useEffect } from 'react';
// Use next/navigation instead of react-router-dom
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Cuộn lên đầu trang một cách mượt mà hoặc ngay lập tức
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Sử dụng 'instant' để tránh cảm giác bị giật khi chuyển trang
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
