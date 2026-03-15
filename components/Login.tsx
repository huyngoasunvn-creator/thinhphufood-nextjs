"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Lock, User as UserIcon, ArrowLeft, Loader2, UserPlus, AlertTriangle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import SEOManager from '../components/common/SEO';
import { getAuth } from "firebase/auth";

const Login: React.FC = () => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, user } = useAuth();
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  // Nếu đã login thì về trang chủ
  

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      if (isRegister) {
        await registerWithEmail(formData.email, formData.password, formData.name);
      } else {
        await loginWithEmail(formData.email, formData.password);
      }

      const currentUser = getAuth().currentUser;

      if (!currentUser) throw new Error("Không tìm thấy user");

      const idToken = await currentUser.getIdToken();

      const res = await fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({ token: idToken }),
});

if (!res.ok) {
  throw new Error("Login API failed");
}

const data = await res.json();

// QUAN TRỌNG: reload để cookie được nhận
window.location.href = data.role === "admin" ? "/admin" : "/";

    } catch (error: any) {
      console.error("Auth Error:", error);

      let message = "Đã có lỗi xảy ra.";

      if (error.code === 'auth/user-not-found')
        message = "Tài khoản không tồn tại.";

      if (error.code === 'auth/wrong-password')
        message = "Mật khẩu không chính xác.";

      if (error.code === 'auth/email-already-in-use')
        message = "Email này đã được đăng ký.";

      setErrorMessage(message);

    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
  setErrorMessage(null);

  try {
    await loginWithGoogle();

    const currentUser = getAuth().currentUser;
    if (!currentUser) throw new Error("Không tìm thấy user");

    const idToken = await currentUser.getIdToken();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token: idToken }),
    });

    if (!res.ok) {
      throw new Error("Login API failed");
    }

    const data = await res.json();

    window.location.href = data.role === "admin" ? "/admin" : "/";

  } catch {
    setErrorMessage("Đăng nhập Google thất bại!");
  }
};

  const inputClass =
    "w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-bold text-slate-900";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <SEOManager title={isRegister ? "Đăng ký tài khoản" : "Đăng nhập tài khoản"} />

      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-green-900/10 p-10 border border-slate-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-slate-900">
            {isRegister ? 'Tạo tài khoản' : 'Chào mừng bạn!'}
          </h1>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isRegister && (
            <input
              required
              type="text"
              placeholder="Họ và tên"
              className={inputClass}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          )}

          <input
            required
            type="email"
            placeholder="Email"
            className={inputClass}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            required
            type="password"
            placeholder="Mật khẩu"
            className={inputClass}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold"
          >
            {loading ? "Đang xử lý..." : isRegister ? "Đăng ký" : "Đăng nhập"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 border rounded-2xl py-4"
        >
          Đăng nhập với Google
        </button>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-green-600 text-sm"
          >
            {isRegister ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;