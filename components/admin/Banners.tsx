import { Banner } from '@/types';

interface BannersProps {
  banners: Banner[];
  onUpdate: (updated: Banner[]) => Promise<void>;
}

const Banners = ({ banners, onUpdate }: BannersProps) => {
  return (
    <div>
      <h1>Quản lý banner</h1>
      <p>Tổng số banner: {banners.length}</p>
    </div>
  );
};

export default Banners;
