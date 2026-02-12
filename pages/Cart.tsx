
import React, { useState } from 'react';
// Use next/link and next/navigation instead of react-router-dom
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { CartItem, Order } from '../types';
import CartEmpty from '../components/cart/CartEmpty';
import CartItemRow from '../components/cart/CartItemRow';
import CheckoutForm from '../components/cart/CheckoutForm';
import OrderSummary from '../components/cart/OrderSummary';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onSetQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onAddOrder: (order: Order) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onUpdateQuantity, onSetQuantity, onRemoveItem, onClearCart, onAddOrder }) => {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    phone: '',
    email: '',
    province: '',
    district: '',
    ward: '',
    streetAddress: '',
    address: '', // Sẽ được tổng hợp trước khi submit
    note: '',
    paymentMethod: 'cod'
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Tổng hợp địa chỉ đầy đủ
    const fullAddress = `${checkoutData.streetAddress}, ${checkoutData.ward}, ${checkoutData.district}, ${checkoutData.province}`;
    
    // Tạo đối tượng đơn hàng mới với đầy đủ thông tin
    const newOrder: Order = {
      id: `DH${Date.now().toString().slice(-6)}`,
      customerName: checkoutData.fullName,
      phone: checkoutData.phone,
      address: fullAddress,
      items: [...cartItems],
      shippingFee: shipping,
      total: total,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('vi-VN'),
      note: checkoutData.note,
      paymentMethod: checkoutData.paymentMethod
    };

    // Lưu đơn hàng vào hệ thống
    onAddOrder(newOrder);
    
    alert(`Cảm ơn ${checkoutData.fullName}! Đơn hàng ${newOrder.id} của bạn đã được tiếp nhận. Chúng tôi sẽ liên hệ sớm nhất.`);
    
    // Xóa giỏ hàng và quay về trang chủ
    onClearCart();
    router.push('/');
  };

  if (cartItems.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-8">
          <Link href="/products" className="text-slate-400 hover:text-green-600 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Thanh toán đơn hàng</h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* List Items Container */}
            <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-green-600" />
                Sản phẩm trong giỏ ({cartItems.length})
              </h2>
              <div className="divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <CartItemRow 
                    key={item.id} 
                    item={item} 
                    onUpdateQuantity={onUpdateQuantity}
                    onSetQuantity={onSetQuantity}
                    onRemoveItem={onRemoveItem}
                  />
                ))}
              </div>
            </div>

            {/* Checkout Form Container */}
            <CheckoutForm 
              data={checkoutData} 
              onChange={setCheckoutData} 
              onSubmit={handleOrderSubmit} 
            />
          </div>

          <div className="lg:col-span-4">
            <OrderSummary 
              subtotal={subtotal} 
              shipping={shipping} 
              total={total} 
              itemsCount={cartItems.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
