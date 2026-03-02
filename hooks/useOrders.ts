import { useState, useEffect } from "react";
import { Order } from "@/types";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
     LOAD ORDERS FROM DATABASE
  =============================== */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");

        if (!res.ok) throw new Error("Lỗi tải đơn hàng");

        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Lỗi load orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ===============================
     ADD ORDER (KHÁCH ĐẶT HÀNG)
  =============================== */
  const addOrder = async (order: Order) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Tạo đơn thất bại");

      const savedOrder = await res.json();

      setOrders((prev) => [savedOrder, ...prev]);
    } catch (error) {
      console.error("Lỗi tạo đơn:", error);
    }
  };

  /* ===============================
     UPDATE ORDER (ADMIN ĐỔI STATUS)
  =============================== */
  const updateOrder = async (id: string, updatedData: Partial<Order>) => {

  // 🔥 ĐỔI UI NGAY LẬP TỨC
  setOrders(prev =>
    prev.map(order =>
      order.id === id
        ? { ...order, ...updatedData }
        : order
    )
  );

  try {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
  } catch (error) {
    console.error("Lỗi update order:", error);
  }
};

  return {
    orders,
    loading,
    addOrder,
    updateOrder,
  };
};