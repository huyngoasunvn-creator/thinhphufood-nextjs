"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import SEOManager from "../components/common/SEO";

const Login: React.FC = () => {
  const {
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    user,
    isAdmin,
    loading: authLoading,
    syncAdminSession,
  } = useAuth();
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user || !isAdmin) {
      setBootstrapping(false);
      return;
    }

    let cancelled = false;

    const bootstrapAdminSession = async () => {
      try {
        await syncAdminSession(user);
        if (!cancelled) {
          router.replace("/admin");
        }
      } catch (error) {
        console.error("Admin session bootstrap failed:", error);
        if (!cancelled) {
          setBootstrapping(false);
        }
      }
    };

    bootstrapAdminSession();

    return () => {
      cancelled = true;
    };
  }, [authLoading, isAdmin, router, syncAdminSession, user]);

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

      await syncAdminSession();
      router.replace("/admin");
    } catch (error: any) {
      console.error("Auth Error:", error);

      let message = "Đã có lỗi xảy ra.";

      if (error.code === "auth/user-not-found") {
        message = "Tài khoản không tồn tại.";
      }

      if (error.code === "auth/wrong-password") {
        message = "Mật khẩu không chính xác.";
      }

      if (error.code === "auth/email-already-in-use") {
        message = "Email này đã được đăng ký.";
      }

      if (error.message === "Không thể đồng bộ phiên đăng nhập") {
        message = "Đăng nhập thành công nhưng không tạo được phiên quản trị.";
      }

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      await loginWithGoogle();
      await syncAdminSession();
      router.replace("/admin");
    } catch (error) {
      console.error("Google login error:", error);
      setErrorMessage("Đăng nhập Google thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-bold text-slate-900";

  if (authLoading || bootstrapping) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-green-900/10 p-10 border border-slate-100 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-3">
            Đang kiểm tra đăng nhập
          </h1>
          <p className="text-slate-500">
            Hệ thống đang đồng bộ phiên quản trị cho tài khoản của bạn.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <SEOManager title={isRegister ? "Đăng ký tài khoản" : "Đăng nhập tài khoản"} />

      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-green-900/10 p-10 border border-slate-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-slate-900">
            {isRegister ? "Tạo tài khoản" : "Chào mừng bạn!"}
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
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold disabled:opacity-70"
          >
            {loading ? "Đang xử lý..." : isRegister ? "Đăng ký" : "Đăng nhập"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mt-4 border rounded-2xl py-4 disabled:opacity-70"
        >
          Đăng nhập với Google
        </button>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-green-600 text-sm"
          >
            {isRegister
              ? "Đã có tài khoản? Đăng nhập"
              : "Chưa có tài khoản? Đăng ký"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
