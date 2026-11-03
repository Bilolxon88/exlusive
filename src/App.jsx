import { ToastContainer } from "react-toastify";
import { useLanguage } from "./LanguageContext";
import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
const Shop = lazy(() => import("./pages/Shop"));
const Product = lazy(() => import("./pages/Product"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Account = lazy(() => import("./pages/Account"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
export default function App() {
  const { t, language } = useLanguage();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const names = {
      "/": "Home",
      "/shop": "Shop",
      "/wishlist": "Wishlist",
      "/cart": "Cart",
      "/checkout": "Checkout",
      "/about": "About",
      "/contact": "Contact",
      "/signup": "Sign Up",
      "/login": "Log In",
      "/account": "My Account",
    };
    document.title = `${t(names[location.pathname] || "Product")} | Exclusive`;
  }, [location.pathname, language]);
  return (
    <>
      <a href="#page-content" className="skip-link">
        {t("Skip to content")}
      </a>
      <Header />
      <div id="page-content">
        <Suspense
          fallback={
            <main className="container page-main" role="status">
              <p className="mt-12">{t("Loading page...")}</p>
            </main>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route
              path="/product/:id"
              element={<Product key={location.pathname} />}
            />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Auth key="signup" signup />} />
            <Route path="/login" element={<Auth key="login" />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        closeButton={false}
        hideProgressBar
        limit={1}
        theme="light"
        className="exclusive-toaster"
        toastClassName="exclusive-toast"
        aria-label={t("Notifications")}
      />
    </>
  );
}
