
import React from 'react';
import { Truck, CreditCard, MapPin, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { PROVINCES, DISTRICTS, WARDS } from '../../data/locations';

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
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ data, onChange, onSubmit }) => {
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
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}><User className="h-3 w-3 mr-1.5" /> Họ và tên</label>
            <input required type="text" className={inputClass} placeholder="Nguyễn Văn A" value={data.fullName} onChange={e => onChange({...data, fullName: e.target.value})} />
          </div>
          <div>
            <label className={labelClass}><Phone className="h-3 w-3 mr-1.5" /> Số điện thoại</label>
            <input required type="tel" pattern="[0-9]*" inputMode="numeric" className={inputClass} placeholder="0912345678" value={data.phone} onChange={handlePhoneChange} />
          </div>
        </div>

        <div>
          <label className={labelClass}><Mail className="h-3 w-3 mr-1.5" /> Email</label>
          <input required type="email" className={inputClass} placeholder="example@gmail.com" value={data.email} onChange={e => onChange({...data, email: e.target.value})} />
        </div>

        <div className="space-y-4 pt-2">
          <label className={labelClass}><MapPin className="h-3 w-3 mr-1.5" /> Địa chỉ giao hàng</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select required className={`${inputClass} appearance-none cursor-pointer`} value={data.province} onChange={e => onChange({...data, province: e.target.value, district: '', ward: ''})}>
              <option value="">Chọn Tỉnh/Thành</option>
              {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select required disabled={!data.province} className={`${inputClass} appearance-none cursor-pointer disabled:opacity-50`} value={data.district} onChange={e => onChange({...data, district: e.target.value, ward: ''})}>
              <option value="">Chọn Quận/Huyện</option>
              {(DISTRICTS[data.province] || []).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select required disabled={!data.district} className={`${inputClass} appearance-none cursor-pointer disabled:opacity-50`} value={data.ward} onChange={e => onChange({...data, ward: e.target.value})}>
              <option value="">Chọn Phường/Xã</option>
              {(WARDS[data.district] || []).map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          <input required type="text" className={inputClass} placeholder="Số nhà, tên đường..." value={data.streetAddress} onChange={e => onChange({...data, streetAddress: e.target.value})} />
        </div>

        <div>
          <label className={labelClass}><MessageSquare className="h-3 w-3 mr-1.5" /> Ghi chú đơn hàng</label>
          <textarea rows={2} className={`${inputClass} resize-none`} placeholder="Ví dụ: Giao giờ hành chính..." value={data.note} onChange={e => onChange({...data, note: e.target.value})}></textarea>
        </div>

        <div className="pt-4">
          <label className={labelClass}><CreditCard className="h-3 w-3 mr-1.5" /> Phương thức thanh toán</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${data.paymentMethod === 'cod' ? 'border-green-600 bg-green-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
              <div className="flex items-center space-x-3">
                <Truck className={`h-5 w-5 ${data.paymentMethod === 'cod' ? 'text-green-600' : 'text-slate-400'}`} />
                <span className={`font-bold text-sm ${data.paymentMethod === 'cod' ? 'text-green-800' : 'text-slate-600'}`}>Khi nhận hàng</span>
              </div>
              <input type="radio" className="hidden" value="cod" checked={data.paymentMethod === 'cod'} onChange={() => onChange({...data, paymentMethod: 'cod'})} />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${data.paymentMethod === 'cod' ? 'border-green-600' : 'border-slate-300'}`}>
                {data.paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}
              </div>
            </label>
            <label className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${data.paymentMethod === 'transfer' ? 'border-green-600 bg-green-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
              <div className="flex items-center space-x-3">
                <CreditCard className={`h-5 w-5 ${data.paymentMethod === 'transfer' ? 'text-green-600' : 'text-slate-400'}`} />
                <span className={`font-bold text-sm ${data.paymentMethod === 'transfer' ? 'text-green-800' : 'text-slate-600'}`}>Chuyển khoản</span>
              </div>
              <input type="radio" className="hidden" value="transfer" checked={data.paymentMethod === 'transfer'} onChange={() => onChange({...data, paymentMethod: 'transfer'})} />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${data.paymentMethod === 'transfer' ? 'border-green-600' : 'border-slate-300'}`}>
                {data.paymentMethod === 'transfer' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}
              </div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
