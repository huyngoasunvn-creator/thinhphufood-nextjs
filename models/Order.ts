import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: String,

    // Địa chỉ gộp chung (khách tự điền)
    address: {
      type: String,
      required: false, // KHÔNG bắt buộc
    },

    // Nếu vẫn muốn lưu chi tiết
    province: String,
    district: String,
    ward: String,
    streetAddress: String,

    note: String,
    paymentMethod: String,

    items: [
  {
    productId: {
      type: String,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
],

    total: Number,

    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true } // tự tạo createdAt
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);