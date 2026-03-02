import React from 'react';
import { Truck, CreditCard, MapPin, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { useVietnamAddress } from "../../hooks/useVietnamAddress";

interface CheckoutData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  streetAddress: string;
  note: string;
  paymentMethod: string;
}

interface CheckoutFormProps {
  data: CheckoutData;
  onChange: (data: CheckoutData) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  data, 
  onChange, 
  onSubmit,
  loading 
}) => {

  const {
    provinces,
    districts,
    wards,
    selectedProvince,
    selectedDistrict,
    setSelectedProvince,
    setSelectedDistrict,
  } = useVietnamAddress();

  const inputClass = "w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400 text-sm";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 px-1 flex items-center";

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    onChange({ ...data, phone: value });
  };

  return (
    <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
        <Truck className="h-5 w-5 mr-3 text-green-600" />
        Thông tin nhận hàng
      </h2>

      <form id="order-form" onSubmit={onSubmit} className="space-y-8">
        
        {/* Họ tên + SĐT */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}><User className="h-3 w-3 mr-1.5" /> Họ và tên</label>
            <input
              required
              type="text"
              className={inputClass}
              value={data.fullName}
              onChange={e => onChange({ ...data, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className={labelClass}><Phone className="h-3 w-3 mr-1.5" /> Số điện thoại</label>
            <input
              required
              type="tel"
              className={inputClass}
              value={data.phone}
              onChange={handlePhoneChange}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}><Mail className="h-3 w-3 mr-1.5" /> Email</label>
          <input
            required
            type="email"
            className={inputClass}
            value={data.email}
            onChange={e => onChange({ ...data, email: e.target.value })}
          />
        </div>

        {/* Địa chỉ */}
        <div className="space-y-4 pt-2">
          <label className={labelClass}><MapPin className="h-3 w-3 mr-1.5" /> Địa chỉ giao hàng</label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Tỉnh */}
            <select
              className={inputClass}
              value={data.province}
              onChange={(e) => {
                const province = provinces.find(p => p.name === e.target.value);
                setSelectedProvince(province);
                onChange({
                  ...data,
                  province: e.target.value,
                  district: '',
                  ward: ''
                });
              }}
            >
              <option value="">Chọn Tỉnh/Thành</option>
              {provinces.map((p) => (
                <option key={p.code} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* Quận */}
            <select
              className={inputClass}
              disabled={!selectedProvince}
              value={data.district}
              onChange={(e) => {
                const district = districts.find(d => d.name === e.target.value);
                setSelectedDistrict(district);
                onChange({
                  ...data,
                  district: e.target.value,
                  ward: ''
                });
              }}
            >
              <option value="">Chọn Quận/Huyện</option>
              {districts.map((d) => (
                <option key={d.code} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Phường */}
            <select
              className={inputClass}
              disabled={!selectedDistrict}
              value={data.ward}
              onChange={(e) =>
                onChange({
                  ...data,
                  ward: e.target.value,
                })
              }
            >
              <option value="">Chọn Phường/Xã</option>
              {wards.map((w) => (
                <option key={w.code} value={w.name}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>

          {/* Số nhà */}
          <input
            type="text"
            className={inputClass}
            placeholder="Số nhà, tên đường..."
            value={data.streetAddress}
            onChange={e => onChange({ ...data, streetAddress: e.target.value })}
          />
        </div>

        {/* Ghi chú */}
        <div>
          <label className={labelClass}><MessageSquare className="h-3 w-3 mr-1.5" /> Ghi chú đơn hàng</label>
          <textarea
            rows={2}
            className={`${inputClass} resize-none`}
            value={data.note}
            onChange={e => onChange({ ...data, note: e.target.value })}
          />
        </div>

        {/* Thanh toán */}
        <div className="pt-4">
          <label className={labelClass}><CreditCard className="h-3 w-3 mr-1.5" /> Phương thức thanh toán</label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* COD */}
            <label className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer ${data.paymentMethod === 'cod' ? 'border-green-600 bg-green-50' : 'border-slate-100 bg-slate-50'}`}>
              <span className="font-bold text-sm">Khi nhận hàng</span>
              <input
                type="radio"
                className="hidden"
                checked={data.paymentMethod === 'cod'}
                onChange={() => onChange({ ...data, paymentMethod: 'cod' })}
              />
            </label>

            {/* Transfer */}
            <label className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer ${data.paymentMethod === 'transfer' ? 'border-green-600 bg-green-50' : 'border-slate-100 bg-slate-50'}`}>
              <span className="font-bold text-sm">Chuyển khoản</span>
              <input
                type="radio"
                className="hidden"
                checked={data.paymentMethod === 'transfer'}
                onChange={() => onChange({ ...data, paymentMethod: 'transfer' })}
              />
            </label>

          </div>
        </div>

      </form>
    </div>
  );
};

export default CheckoutForm;