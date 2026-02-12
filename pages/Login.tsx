
import React, { useState } from 'react';
// Use next/navigation instead of react-router-dom
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Lock, User as UserIcon, ArrowLeft, Loader2, UserPlus, AlertTriangle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import SEOManager from '../components/common/SEO';

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
      // router.back() or router.push('/') depending on context
      router.push('/');
    } catch (error: any) {
      console.error("Auth Error:", error);
      let message = "Đã có lỗi xảy ra.";
      if (error.code === 'auth/user-not-found') message = "Tài khoản không tồn tại.";
      if (error.code === 'auth/wrong-password') message = "Mật khẩu không chính xác.";
      if (error.code === 'auth/email-already-in-use') message = "Email này đã được đăng ký.";
      if (error.code === 'auth/operation-not-allowed') {
        message = "Tính năng Đăng nhập/Đăng ký chưa được bật trong Firebase Console. Vui lòng vào Authentication > Sign-in method và bật Email/Password.";
      }
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    try {
      await loginWithGoogle();
      router.push('/');
    } catch (error: any) {
      if (error.code === 'auth/operation-not-allowed') {
        setErrorMessage("Đăng nhập Google chưa được bật. Hãy bật 'Google' trong Authentication > Sign-in method.");
      } else {
        setErrorMessage("Đăng nhập Google thất bại!");
      }
    }
  };

  if (user) {
    router.push('/');
    return null;
  }

  const inputClass = "w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-bold text-slate-900";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <SEOManager title={isRegister ? "Đăng ký tài khoản" : "Đăng nhập tài khoản"} />
      
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-green-900/10 p-10 border border-slate-100">
        <div className="text-center">
            <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <img src="https://res.cloudinary.com/dozhznwuf/image/upload/v1770731483/logo-tp-5_yizb09.png" className="h-12 w-auto" alt="Logo" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">
                {isRegister ? 'Tạo tài khoản' : 'Chào mừng bạn!'}
            </h1>
            <p className="text-slate-500 mb-8 font-medium text-sm leading-relaxed">
                {isRegister ? 'Tham gia cùng ThinhPhuFood để nhận ưu đãi.' : 'Đăng nhập để tiếp tục mua sắm và lưu giỏ hàng.'}
            </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start space-x-3 animate-in fade-in zoom-in duration-300">
            <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-600 font-bold leading-relaxed">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isRegister && (
            <div className="relative">
              <UserIcon className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <input 
                required 
                type="text" 
                placeholder="Họ và tên của bạn"
                className={inputClass}
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
            <input 
              required 
              type="email" 
              placeholder="Địa chỉ Email"
              className={inputClass}
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
            <input 
              required 
              type="password" 
              placeholder="Mật khẩu"
              className={inputClass}
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-green-100 hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (isRegister ? <UserPlus className="h-5 w-5" /> : <LogIn className="h-5 w-5" />)}
            <span>{isRegister ? 'Đăng ký ngay' : 'Đăng nhập'}</span>
          </button>
        </form>

        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span className="bg-white px-4">Hoặc tiếp tục với</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-3 py-4 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all group active:scale-95 mb-6"
        >
          <img 
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" 
            className="w-5 h-5" 
            alt="Google" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png";
            }}
          />
          <span className="font-bold text-slate-700">Đăng nhập với Google</span>
        </button>

        <div className="text-center space-y-4">
            <button 
                onClick={() => {
                  setIsRegister(!isRegister);
                  setErrorMessage(null);
                }}
                className="text-sm font-bold text-green-700 hover:text-green-800 transition-colors"
            >
                {isRegister ? 'Bạn đã có tài khoản? Đăng nhập' : 'Bạn chưa có tài khoản? Đăng ký ngay'}
            </button>
            <br />
            <button 
                onClick={() => router.push('/')}
                className="inline-flex items-center space-x-2 text-slate-400 font-bold text-xs hover:text-slate-600 transition-colors"
            >
                <ArrowLeft className="h-3 w-3" />
                <span>Quay lại trang chủ</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
