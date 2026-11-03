import { useLanguage } from "../LanguageContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useStore } from "../store";
import Breadcrumb from "../components/Breadcrumb";
import EmptyState from "../components/EmptyState";
import CartTable from "../components/CartTable";
import { money } from "../utils";
export default function Cart() {
  const { t, validateForm } = useLanguage();
  const { items, subtotal, updateQty } = useStore();
  const [code, setCode] = useState("");
  const [coupon, setCoupon] = useState(false);
  const [error, setError] = useState("");
  const total = subtotal * (coupon ? 0.9 : 1);
  return (
    <main className="container page-main">
      <Breadcrumb items={["Cart"]} />
      <h1 className="sr-only">{t("Cart")}</h1>
      {!items.length ? (
        <EmptyState
          title={t("Your cart is waiting")}
          description="Find something you love and add it to your cart."
        />
      ) : (
        <>
          <CartTable items={items} onQuantityChange={updateQty} />
          <div className="cart-buttons">
            <Link to="/shop" className="btn-outline">
              {t("Return To Shop")}
            </Link>
            <span className="cart-saved">
              <Check size={16} />
              {t("Cart saved automatically")}
            </span>
          </div>
          <div className="cart-bottom">
            <form
              className="coupon-form"
              onSubmit={(e) => {
                e.preventDefault();
                const invalid = validateForm(e.currentTarget);
                if (invalid) {
                  setError(invalid);
                  return;
                }
                const valid = code.trim().toUpperCase() === "EXCLUSIVE10";
                setCoupon(valid);
                setError(valid ? "" : "Use EXCLUSIVE10 for 10% off.");
              }}
              noValidate
            >
              <div>
                <input
                  placeholder={t("Coupon Code")}
                  aria-label={t("Coupon code")}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                {error && <p className="form-error">{t(error)}</p>}
                {coupon && (
                  <p className="text-green-700 text-sm mt-2">
                    {t("10% discount applied")}
                  </p>
                )}
              </div>
              <button className="btn">{t("Apply Coupon")}</button>
            </form>
            <section className="cart-total">
              <h2>{t("Cart Total")}</h2>
              <div>
                <span>{t("Subtotal:")}</span>
                <span>{money(subtotal)}</span>
              </div>
              {coupon && (
                <div>
                  <span>{t("Discount:")}</span>
                  <span>−{money(subtotal * 0.1)}</span>
                </div>
              )}
              <div>
                <span>{t("Shipping:")}</span>
                <span>{t("Free")}</span>
              </div>
              <div className="total-row">
                <span>{t("Total:")}</span>
                <span>{money(total)}</span>
              </div>
              <Link
                to={`/checkout${coupon ? "?coupon=EXCLUSIVE10" : ""}`}
                className="btn"
              >
                {t("Proceed to checkout")}
              </Link>
            </section>
          </div>
        </>
      )}
    </main>
  );
}
