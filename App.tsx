
import React from 'react';
// Mocking routing components since we are in a Next.js environment
const Router = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const Routes = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// Fix: Add children support to Route mock to allow nested routes and fix TS error
const Route = ({ element, children }: { element: React.ReactNode, children?: React.ReactNode, path?: string, index?: boolean }) => (
  <>
    {React.isValidElement(element) && children 
      ? React.cloneElement(element as React.ReactElement<any>, { children }) 
      : element}
    {!React.isValidElement(element) && children ? children : null}
  </>
);

import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Popup from './components/common/Popup';
import ScrollToTop from './components/common/ScrollToTop';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminNews from './pages/admin/News';
import AdminCategories from './pages/admin/Categories';
import AdminBanners from './pages/admin/Banners';
import AdminCommitments from './pages/admin/Commitments';
import AdminPopups from './pages/admin/Popups';
import AdminConfig from './pages/admin/Config';
import AdminAboutConfig from './pages/admin/AboutConfig';
import AdminAboutPageConfig from './pages/admin/AboutPageConfig';
import AdminProfileConfig from './pages/admin/ProfileConfig';
import AdminContactConfig from './pages/admin/AdminContactConfig';
import SEOConfig from './pages/admin/SEOConfig';
import AdminMessages from './pages/admin/ContactMessages';

import { useAppState } from './hooks/useAppState';

const App: React.FC = () => {
  const {
    products, cartItems, categories, banners, news, orders, commitments, contact, aboutPage, profile, aboutConfig, popupConfig, siteConfig, cartCount, contactMessages,
    addToCart, updateQuantity, setQuantity, removeItem, clearCart, updateSiteConfig,
    addOrder, saveOrders, saveProducts, saveCategories, saveNews, saveBanners, saveCommitments, saveContact, saveAboutConfig, saveAboutPage, saveProfile, savePopups,
    addMessage, deleteMessage, markAsRead
  } = useAppState();

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Login Page - No Layout */}
        <Route path="/login" element={<Login />} />

        {/* Main Routes with Layout */}
        <Route path="/*" element={
          <Layout 
            cartCount={cartCount} 
            profileActive={profile.isActive} 
            aboutActive={aboutPage.isActive}
            siteConfig={siteConfig}
          >
            <Routes>
              <Route path="/" element={<Home products={products} news={news} banners={banners} commitments={commitments} aboutConfig={aboutConfig} onAddToCart={addToCart} />} />
              <Route path="/products" element={<Products products={products} categories={categories} onAddToCart={addToCart} />} />
              {/* SEO Friendly Routes using Slugs */}
              <Route path="/san-pham/:slug" element={<ProductDetail products={products} siteConfig={siteConfig} onAddToCart={addToCart} />} />
              <Route path="/tin-tuc" element={<News news={news} banners={banners} />} />
              <Route path="/tin-tuc/:slug" element={<NewsDetail news={news} />} />
              <Route path="/cart" element={<Cart cartItems={cartItems} onUpdateQuantity={updateQuantity} onSetQuantity={setQuantity} onRemoveItem={removeItem} onClearCart={clearCart} onAddOrder={addOrder} />} />
              <Route path="/contact" element={<Contact config={contact} onSendMessage={addMessage} />} />
              <Route path="/about-us" element={<AboutUs config={aboutPage} />} />
              <Route path="/profile" element={<Profile config={profile} />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<div className="bg-white p-12 rounded-[3rem] border border-dashed border-slate-300 text-center"><h2 className="text-2xl font-black text-slate-800">Chào mừng Admin!</h2><p className="text-slate-500 mt-2 font-medium">Chọn một mục từ menu bên trái để quản lý nội dung website.</p></div>} />
                <Route path="products" element={<AdminProducts products={products} categories={categories} onAdd={p => saveProducts([p, ...products])} onUpdate={p => saveProducts(products.map(x => x.id === p.id ? p : x))} onDelete={id => saveProducts(products.filter(p => p.id !== id))} />} />
                <Route path="orders" element={<AdminOrders orders={orders} onUpdateOrders={saveOrders} />} />
                <Route path="categories" element={<AdminCategories categories={categories} onUpdate={saveCategories} />} />
                <Route path="news" element={<AdminNews news={news} onUpdate={saveNews} />} />
                <Route path="banners" element={<AdminBanners banners={banners} onUpdate={saveBanners} />} />
                <Route path="commitments" element={<AdminCommitments commitments={commitments} onUpdate={saveCommitments} />} />
                <Route path="seo" element={<SEOConfig config={siteConfig} />} />
                <Route path="contact" element={<AdminContactConfig config={contact} onUpdate={saveContact} />} />
                <Route path="messages" element={<AdminMessages messages={contactMessages} onDelete={deleteMessage} onMarkAsRead={markAsRead} />} />
                <Route path="about" element={<AdminAboutConfig config={aboutConfig} onUpdate={saveAboutConfig} />} />
                <Route path="about-page" element={<AdminAboutPageConfig config={aboutPage} onUpdate={saveAboutPage} />} />
                <Route path="profile" element={<AdminProfileConfig config={profile} onUpdate={saveProfile} />} />
                <Route path="popups" element={<AdminPopups config={popupConfig} onUpdate={savePopups} />} />
                <Route path="config" element={<AdminConfig config={siteConfig} onUpdate={updateSiteConfig} />} />
              </Route>
            </Routes>
            <Popup config={popupConfig} />
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
