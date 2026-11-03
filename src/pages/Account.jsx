import { useLanguage } from "../LanguageContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Package } from "lucide-react";
import { useStore, readSaved } from "../store";
import { useAuth } from "../AuthContext";
import Breadcrumb from "../components/Breadcrumb";
import { money } from "../utils";
export default function Account() {
  const { t, validateForm, language } = useLanguage();
  const { profile, setProfile } = useStore();
  const { user, loading, logout } = useAuth();
  const [tab, setTab] = useState("profile");
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const orders = readSaved("exclusive-orders", []);
  function save(e) {
    e.preventDefault();
    const invalid = validateForm(e.currentTarget);
    if (invalid) {
      setError(invalid);
      return;
    }
    setError("");
    setProfile(Object.fromEntries(new FormData(e.currentTarget)));
    setSaved(true);
  }
  return (
    <main className="container page-main">
      <div className="account-top">
        <Breadcrumb items={["My Account"]} />
        <p>
          {t("Welcome!")}
          <span>{profile?.firstName || t("Guest")}</span>
        </p>
      </div>
      <div className="account-layout">
        <aside>
          <h3>{t("Manage My Account")}</h3>
          <button
            className={tab === "profile" ? "active" : ""}
            onClick={() => setTab("profile")}
          >
            {t("My Profile")}
          </button>
          <button
            className={tab === "orders" ? "active" : ""}
            onClick={() => setTab("orders")}
          >
            {t("My Orders")}
          </button>
          <Link to="/wishlist">{t("My Wishlist")}</Link>
          <Link to="/cart">{t("My Cart")}</Link>
          {user ? (
            <button
              className="logout"
              onClick={async () => {
                try {
                  await logout();
                } catch {
                  setError(t("Please try again."));
                  return;
                }
                navigate("/");
              }}
            >
              <LogOut size={16} />
              {t("Log Out")}
            </button>
          ) : (
            <Link to="/login">{t("Log In / Register")}</Link>
          )}
        </aside>
        <section className="account-content">
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          {tab === "profile" ? (
            <>
              <h1>{t("Edit Your Profile")}</h1>
              {user && (
                <div className="profile-identity">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt=""
                      width="48"
                      height="48"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <span>{user.displayName || user.email}</span>
                </div>
              )}
              <form key={user?.uid || "guest"} onSubmit={save} noValidate>
                <div className="profile-fields">
                  {[
                    ["firstName", "First Name"],
                    ["lastName", "Last Name"],
                    ["email", "Email"],
                    ["address", "Address"],
                  ].map(([name, label]) => (
                    <label className="field" key={name}>
                      {t(label)}
                      <input
                        name={name}
                        type={name === "email" ? "email" : "text"}
                        required={name === "firstName" || name === "email"}
                        defaultValue={profile?.[name] || ""}
                        readOnly={name === "email" && Boolean(user)}
                        placeholder={t(label)}
                      />
                    </label>
                  ))}
                </div>
                <p className="form-note">
                  {t("Your profile information is saved in this browser.")}
                </p>
                <div className="profile-actions">
                  <button
                    type="reset"
                    className="text-button"
                    onClick={() => setSaved(false)}
                  >
                    {t("Cancel")}
                  </button>
                  <button className="btn">
                    {t(saved ? "Save Again" : "Save Changes")}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1>{t("My Orders")}</h1>
              {Array.isArray(orders) && orders.length ? (
                orders.map((o) => (
                  <article className="order-card" key={o.id}>
                    <div className="flex justify-between gap-4">
                      <strong>{o.id}</strong>
                      <strong>{money(o.total)}</strong>
                    </div>
                    <p>
                      {t("Placed on")}{" "}
                      {new Date(o.date).toLocaleDateString(
                        language === "uz"
                          ? "uz-UZ"
                          : language === "ru"
                            ? "ru-RU"
                            : "en-GB",
                      )}
                    </p>
                    {o.items.map((p, i) => (
                      <div key={i}>
                        {t(p.name)} × {p.qty}
                      </div>
                    ))}
                  </article>
                ))
              ) : (
                <div className="orders-empty">
                  <Package size={36} />
                  <h2>{t("Your next discovery is waiting")}</h2>
                  <p>{t("Your order history will appear here.")}</p>
                  <Link to="/shop" className="btn">
                    {t("Start Shopping")}
                  </Link>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
