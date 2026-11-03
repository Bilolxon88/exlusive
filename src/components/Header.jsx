import { useLanguage } from "../LanguageContext";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  UserRound,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useStore } from "../store";
import { useAuth } from "../AuthContext";
import { languages } from "../LanguageContext";
export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { wishlist } = useStore();
  const { user, loading } = useAuth();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  function searchProducts(e) {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(search.trim())}`);
    setOpen(false);
  }
  return (
    <>
      <div className="promo-bar">
        <div className="container relative flex items-center justify-center gap-3">
          <span>
            {t(
              "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!",
            )}
          </span>
          <Link
            to="/shop"
            className="font-semibold underline underline-offset-4"
          >
            {t("ShopNow")}
          </Link>
          <label className="promo-language language-switch">
            <select
              aria-label={t("Language")}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {Object.entries(languages).map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </label>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            {t("Exclusive")}
          </Link>
          <nav
            className={open ? "main-nav is-open" : "main-nav"}
            aria-label={t("Main navigation")}
          >
            {[
              ["/", "Home"],
              ["/contact", "Contact"],
              ["/about", "About"],
              ["/signup", "Sign Up"],
            ].map(([path, label]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                {t(label)}
              </NavLink>
            ))}
          </nav>
          <form className="search-box" onSubmit={searchProducts} noValidate>
            <input
              aria-label={t("Search products")}
              placeholder={t("What are you looking for?")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button aria-label={t("Search")} type="submit">
              <Search size={22} />
            </button>
          </form>
          <div className="header-actions">
            <Link
              to="/wishlist"
              aria-label={t("Wishlist, {count} items", {
                count: wishlist.length,
              })}
              className="icon-button"
            >
              <Heart />
              {wishlist.length > 0 && (
                <span className="badge">{wishlist.length}</span>
              )}
            </Link>
            <Link to="/cart" aria-label={t("Cart")} className="icon-button">
              <ShoppingCart />
            </Link>
            <Link
              to={user ? "/account" : "/login"}
              aria-label={t("My account")}
              title={user?.displayName || user?.email || t("My account")}
              className={
                user
                  ? "account-link signed-in-link"
                  : "account-link icon-button"
              }
            >
              {user?.photoURL ? (
                <img
                  className="account-avatar"
                  src={user.photoURL}
                  alt=""
                  width="28"
                  height="28"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <UserRound size={22} />
              )}
              {user && (
                <span className="account-name">
                  {user.displayName || user.email}
                </span>
              )}
              {loading && (
                <span
                  className="session-indicator"
                  aria-label={t("Checking your session...")}
                />
              )}
            </Link>
            <button
              className="mobile-menu icon-button"
              aria-label={t("Toggle navigation")}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
