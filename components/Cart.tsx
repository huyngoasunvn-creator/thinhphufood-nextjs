import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import CartEmpty from '../components/cart/CartEmpty';
import CartItemRow from '../components/cart/CartItemRow';
import CheckoutForm from '../components/cart/CheckoutForm';
import OrderSummary from '../components/cart/OrderSummary';
import { Order } from '@/types';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onSetQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onAddOrder: (order: Order) => Promise<void>;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  onUpdateQuantity,
  onSetQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    phone: '',
    email: '',
    province: '',
    district: '',
    ward: '',
    streetAddress: '',
    address: '',
    note: '',
    paymentMethod: 'cod',
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!checkoutData.fullName || !checkoutData.phone) {
      alert('Vui lòng nhập đầy đủ Họ tên và Số điện thoại');
      return;
    }

    setLoading(true);

    const fullAddress =
      checkoutData.address ||
      `${checkoutData.streetAddress}, ${checkoutData.ward}, ${checkoutData.district}, ${checkoutData.province}`;

    const orderData = {
      customerName: checkoutData.fullName,
      phone: checkoutData.phone,
      email: checkoutData.email,
      address: fullAddress,
      province: checkoutData.province,
      district: checkoutData.district,
      ward: checkoutData.ward,
      streetAddress: checkoutData.streetAddress,
      note: checkoutData.note,
      paymentMethod: checkoutData.paymentMethod,
      items: cartItems,
      shippingFee: shipping,
      total: total,
      status: 'pending',
      createdAt: new Date(),
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error('Tạo đơn thất bại');

      alert('🎉 Đặt hàng thành công! Chúng tôi sẽ liên hệ sớm.');

      onClearCart();
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi đặt hàng!');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-8">
          <Link
            href="/san-pham"
            className="text-slate-400 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">
            Thanh toán đơn hàng
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Cart Items */}
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

            {/* Checkout Form */}
            <CheckoutForm
              data={checkoutData}
              onChange={setCheckoutData}
              onSubmit={handleOrderSubmit}
              loading={loading}
            />
          </div>

          {/* Order Summary */}
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