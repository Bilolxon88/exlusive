import { useLanguage } from "../LanguageContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  ArrowRight,
  X,
  Send,
  Instagram,
  Linkedin,
} from "lucide-react";
export default function Footer() {
  const { t, validateForm } = useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [policy, setPolicy] = useState(null);
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand" to="/">
            {t("Exclusive")}
          </Link>
          <h3>{t("Subscribe")}</h3>
          <p>{t("Get 10% off your first order")}</p>
          <form
            className="subscribe-form"
            onSubmit={(e) => {
              e.preventDefault();
              const invalid = validateForm(e.currentTarget);
              setMessage(invalid || t("Your welcome code: EXCLUSIVE10"));
              if (invalid) {
                return;
              }
              setEmail("");
            }}
            noValidate
          >
            <input
              type="email"
              required
              aria-label={t("Email for offers")}
              placeholder={t("Enter your email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button aria-label={t("Get welcome offer")}>
              <Send size={20} />
            </button>
          </form>
          {message && (
            <p className="text-sm mt-2" role="status">
              {message}
            </p>
          )}
        </div>
        <div>
          <h3>{t("Support")}</h3>
          <p>
            {t("111 Bijoy sarani, Dhaka,")}
            <br />
            {t("DH 1515, Bangladesh.")}
          </p>
          <a href="mailto:exclusive@gmail.com">{t("exclusive@gmail.com")}</a>
          <a href="tel:+88015888889999">+88015-88888-9999</a>
        </div>
        <div>
          <h3>{t("Account")}</h3>
          <Link to="/account">{t("My Account")}</Link>
          <Link to="/login">{t("Login / Register")}</Link>
          <Link to="/cart">{t("Cart")}</Link>
          <Link to="/wishlist">{t("Wishlist")}</Link>
          <Link to="/shop">{t("Shop")}</Link>
        </div>
        <div>
          <h3>{t("Quick Link")}</h3>
          {["Privacy Policy", "Terms Of Use", "FAQ"].map((p) => (
            <button key={p} onClick={() => setPolicy(p)}>
              {t(p)}
            </button>
          ))}
          <Link to="/contact">{t("Contact")}</Link>
        </div>
        <div>
          <h3>{t("Shop on the go")}</h3>
          <p className="text-xs text-neutral-400">
            {t("Your favorites, wherever you are.")}
          </p>
          <div className="app-card">
            <ShoppingCart size={32} />
            <div>
              {t("One store.")}
              <br />
              <strong>{t("Endless discoveries.")}</strong>
            </div>
          </div>
          <Link className="footer-shop" to="/shop">
            {t("Explore the collection")}
            <ArrowRight size={17} />
          </Link>
          <div className="footer-social">
            <a href="https://www.facebook.com/" aria-label={t("Facebook")}>
              {t("f")}
            </a>
            <a href="https://www.instagram.com/" aria-label={t("Instagram")}>
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/" aria-label={t("LinkedIn")}>
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">
        {t("\xA9 Exclusive 2026. All rights reserved.")}
      </div>
      {policy && (
        <div className="modal-backdrop" onClick={() => setPolicy(null)}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={t(policy)}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close icon-button"
              onClick={() => setPolicy(null)}
              aria-label={t("Close dialog")}
            >
              <X />
            </button>
            <h2>{t(policy)}</h2>
            {policy === "FAQ" ? (
              <>
                <h3>{t("How do I place an order?")}</h3>
                <p>
                  {t(
                    "Add products to your cart and continue to checkout. Your order history is saved in this browser; no online payment is collected.",
                  )}
                </p>
                <h3>{t("Where are my favorites saved?")}</h3>
                <p>{t("Your cart and wishlist are saved in this browser.")}</p>
              </>
            ) : (
              <p>
                {t(
                  "Your cart, profile and order history are saved in this browser. Firebase manages sign-in. Telegram orders include your contact details. No online payment is collected.",
                )}
              </p>
            )}
          </section>
        </div>
      )}
    </footer>
  );
}
