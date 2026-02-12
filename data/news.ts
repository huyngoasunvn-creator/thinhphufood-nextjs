
import { NewsPost } from '../types';

export const SAMPLE_NEWS: NewsPost[] = [
  {
    id: 'n1',
    title: '5 Cách phân biệt gạo ST25 thật và giả trên thị trường',
    slug: '5-cach-phan-biet-gao-st25-that-va-gia',
    summary: 'Gạo ST25 là loại gạo ngon nhất thế giới nên bị làm giả rất nhiều. Hãy cùng ThinhPhuFood tìm hiểu cách nhận biết gạo chính hãng.',
    content: `
      <p>Gạo ST25 (Gạo Sóc Trăng 25) do kỹ sư Hồ Quang Cua cùng nhóm cộng sự nghiên cứu và lai tạo. Đây là loại gạo đạt danh hiệu "Gạo ngon nhất thế giới" năm 2019. Chính vì độ hot của nó mà hiện nay trên thị trường xuất hiện rất nhiều loại gạo ST25 giả, nhái bao bì.</p>
      
      <h3 className="text-xl font-bold mt-6 mb-4">1. Quan sát bao bì sản phẩm</h3>
      <p>Bao bì gạo ST25 chính hãng luôn có logo thương hiệu rõ ràng, địa chỉ sản xuất tại Sóc Trăng và có mã QR để truy xuất nguồn gốc. Các loại gạo giả thường in ấn mờ nhạt hoặc sai địa chỉ.</p>
      
      <h3 className="text-xl font-bold mt-6 mb-4">2. Hình dáng hạt gạo</h3>
      <p>Hạt gạo ST25 có đặc điểm là hạt dài, trắng trong, không bạc bụng. Khi cầm trên tay cảm giác hạt gạo rất chắc chắn, không dễ bị gãy vụn.</p>
      
      <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000" alt="Hạt gạo ST25" style="width:100%; border-radius: 20px; margin: 20px 0;" />
      
      <h3 className="text-xl font-bold mt-6 mb-4">3. Mùi thơm đặc trưng</h3>
      <p>Gạo ST25 thật có mùi thơm lá dứa hòa quyện với mùi cốm non rất nhẹ nhàng nhưng bền lâu. Ngay cả khi chưa nấu, bạn cũng có thể cảm nhận được mùi thơm này.</p>
      
      <p>Hy vọng qua bài viết này, bạn sẽ có thêm kiến thức để lựa chọn đúng sản phẩm chất lượng cho gia đình mình!</p>
    `,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800',
    category: 'Kiến thức',
    author: 'Admin ThinhPhu',
    date: '2024-05-15'
  },
  {
    id: 'n2',
    title: 'Bí quyết nấu cơm gạo lứt dẻo ngon, không bị khô cứng',
    slug: 'bi-quyet-nau-com-gao-lut-deo-ngon',
    summary: 'Nhiều người e ngại ăn gạo lứt vì sợ khô và khó ăn. Bài viết này sẽ chia sẻ mẹo nhỏ giúp cơm gạo lứt của bạn luôn dẻo và ngọt.',
    content: `
      <p>Gạo lứt là thực phẩm vàng cho sức khỏe, tuy nhiên nếu không biết cách nấu, cơm sẽ rất cứng và khó tiêu. Dưới đây là quy trình 3 bước để có nồi cơm gạo lứt hoàn hảo:</p>
      
      <ul className="list-disc pl-5 space-y-2 mt-4">
        <li><strong>Ngâm gạo:</strong> Đây là bước quan trọng nhất. Bạn nên ngâm gạo lứt ít nhất 2-4 tiếng trước khi nấu để hạt gạo mềm hơn.</li>
        <li><strong>Tỉ lệ nước:</strong> Thông thường tỉ lệ chuẩn là 1 bát gạo : 2 bát nước.</li>
        <li><strong>Ủ cơm:</strong> Sau khi nồi cơm bật nút, đừng mở nắp ngay mà hãy để ủ thêm 15-20 phút.</li>
      </ul>
      
      <img src="https://images.unsplash.com/photo-1590424600806-2580a3203875?q=80&w=1000" alt="Cơm gạo lứt" style="width:100%; border-radius: 20px; margin: 20px 0;" />
      
      <p>Chúc các bạn thành công với những bữa ăn giàu dinh dưỡng!</p>
    `,
    image: 'https://images.unsplash.com/photo-1590424600806-2580a3203875?q=80&w=800',
    category: 'Món ngon',
    author: 'Đầu bếp xanh',
    date: '2024-05-12'
  }
];
