import { useLanguage } from "../LanguageContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore, readSaved, saveSaved } from "../store";
import { sendOrder } from "../sendOrder";
import Breadcrumb from "../components/Breadcrumb";
import EmptyState from "../components/EmptyState";
import BillingForm from "../components/BillingForm";
import { asset, money } from "../utils";
export default function Checkout() {
  const { t, validateForm } = useLanguage();
  const { items, subtotal, setCart, profile } = useStore();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(
    new URLSearchParams(window.location.search).get("coupon") === "EXCLUSIVE10",
  );
  const [code, setCode] = useState(coupon ? "EXCLUSIVE10" : "");
  const [couponError, setCouponError] = useState("");
  const [payment, setPayment] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");
  const total = subtotal * (coupon ? 0.9 : 1);
  async function placeOrder(e) {
    e.preventDefault();
    if (submitting) return;
    setOrderError("");
    const invalid = validateForm(e.currentTarget);
    if (invalid) {
      setOrderError(invalid);
      return;
    }
    setSubmitting(true);
    try {
      const data = new FormData(e.currentTarget);
      const order = await sendOrder(data, items, payment, coupon);
      if (data.get("save"))
        saveSaved("exclusive-billing", Object.fromEntries(data));
      const prior = readSaved("exclusive-orders", []);
      saveSaved("exclusive-orders", [
        order,
        ...(Array.isArray(prior) ? prior : []),
      ]);
      setCart([]);
      toast.success(
        t(
          order.telegramSent
            ? "Order sent to Telegram!"
            : "Order saved in this browser.",
        ),
        {
          toastId: "place-order",
        },
      );
      navigate("/", {
        replace: true,
      });
    } catch {
      setOrderError(t("Please try again."));
    } finally {
      setSubmitting(false);
    }
  }
  const saved = readSaved("exclusive-billing", {});
  if (!items.length)
    return (
      <main className="container page-main">
        <EmptyState
          title={t("Add a little something first")}
          description="Choose a product before continuing to checkout."
        />
      </main>
    );
  return (
    <main className="container page-main">
      <Breadcrumb
        items={[
          {
            label: "Cart",
            path: "/cart",
          },
          "Checkout",
        ]}
      />
      <h1 className="billing-heading">{t("Billing Details")}</h1>
      <form className="checkout-grid" onSubmit={placeOrder} noValidate>
        <BillingForm saved={saved} profile={profile} />
        <section className="checkout-summary">
          {items.map((p) => (
            <div className="checkout-product" key={p.id}>
              <img src={asset(p.image)} alt={t(p.name)} />
              <span>
                {t(p.name)}
                {p.qty > 1 ? ` × ${p.qty}` : ""}
              </span>
              <span>{money(p.price * p.qty)}</span>
            </div>
          ))}
          <div className="summary-line">
            <span>{t("Subtotal:")}</span>
            <span>{money(subtotal)}</span>
          </div>
          {coupon && (
            <div className="summary-line">
              <span>{t("Discount (10%):")}</span>
              <span>−{money(subtotal * 0.1)}</span>
            </div>
          )}
          <div className="summary-line">
            <span>{t("Shipping:")}</span>
            <span>{t("Free")}</span>
          </div>
          <div className="summary-line border-0!">
            <span>{t("Total:")}</span>
            <strong>{money(total)}</strong>
          </div>
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={payment === "bank"}
              onChange={() => setPayment("bank")}
            />
            <span>{t("Bank transfer")}</span>
            <div className="payment-brands">
              <b>{t("VISA")}</b>
              <b>●●</b>
              <b>{t("Pay")}</b>
            </div>
          </label>
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={payment === "cod"}
              onChange={() => setPayment("cod")}
            />
            {t("Cash on delivery")}
          </label>
          <div className="coupon-form checkout-coupon">
            <input
              aria-label={t("Checkout coupon code")}
              placeholder={t("Coupon Code")}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              type="button"
              className="btn"
              onClick={() => {
                const valid = code.trim().toUpperCase() === "EXCLUSIVE10";
                setCoupon(valid);
                setCouponError(
                  valid
                    ? "10% discount applied."
                    : "Use EXCLUSIVE10 for 10% off.",
                );
              }}
            >
              {t("Apply Coupon")}
            </button>
          </div>
          {couponError && <p className="text-sm mt-2">{t(couponError)}</p>}

          {orderError && (
            <p className="form-error" role="alert">
              {orderError}
            </p>
          )}
          <button className="btn" type="submit" disabled={submitting}>
            {t(submitting ? "Placing Order..." : "Place Order")}
          </button>
        </section>
      </form>
    </main>
  );
}
