import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, authErrors } from "../AuthContext";
import { useLanguage } from "../LanguageContext";
import { asset } from "../utils";
export default function Auth({ signup = false }) {
  const { t, language, validateForm } = useLanguage();
  const { user, loading, authError, loginWithGoogle, loginWithEmail } =
    useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function signIn(action) {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await action();
      navigate("/account");
    } catch (err) {
      setError(authErrors[err.code] || "Sign-in failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  function submit(event) {
    event.preventDefault();
    const invalid = validateForm(event.currentTarget);
    if (invalid) {
      setError(invalid);
      return;
    }
    const form = new FormData(event.currentTarget);
    const name = signup ? String(form.get("name")).trim() : "";
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    if ((signup && !name) || password.length < 6) {
      setError(
        signup && !name
          ? "Please complete all required fields."
          : "Please enter at least 6 characters for your password.",
      );
      return;
    }
    signIn(() => loginWithEmail(email, password, name));
  }
  return (
    <main className="auth-page">
      <div className="auth-image">
        <img
          src={asset("signup.png")}
          alt={t("Shopping cart with a smartphone and shopping bags")}
          width="805"
          height="706"
          fetchPriority="high"
        />
      </div>
      <section className="auth-form-wrap">
        <h1>{t(signup ? "Create an account" : "Log in to Exclusive")}</h1>
        <p>{t("Enter your details below")}</p>
        {user ? (
          <div className="signed-in-info">
            <p>
              {t("Signed in as {name}", {
                name: user.displayName || user.email,
              })}
            </p>
            <Link to="/account" className="btn">
              {t("My Account")}
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={submit} noValidate className="auth-form">
              {signup && (
                <input
                  name="name"
                  placeholder={t("Name")}
                  aria-label={t("Name")}
                  required
                  autoComplete="name"
                />
              )}
              <input
                name="email"
                type="email"
                placeholder={t("Email")}
                aria-label={t("Email")}
                required
                autoComplete="email"
              />
              <input
                name="password"
                type="password"
                placeholder={t("Password")}
                aria-label={t("Password")}
                required
                minLength={6}
                autoComplete={signup ? "new-password" : "current-password"}
              />
              <button className="btn" disabled={busy || loading}>
                {t(
                  busy ? "Signing in..." : signup ? "Create Account" : "Log In",
                )}
              </button>
            </form>
            <div className="auth-divider">{t("or")}</div>
            <button
              type="button"
              className="btn-outline google-button"
              disabled={busy || loading}
              onClick={() => signIn(() => loginWithGoogle(language))}
            >
              <span className="google-letter" aria-hidden="true">
                G
              </span>
              {t("Continue with Google")}
            </button>
          </>
        )}
        {loading && (
          <p role="status" className="form-note">
            {t("Checking your session...")}
          </p>
        )}
        {(error || authError) && (
          <p role="alert" className="form-error">
            {t(
              error ||
                authErrors[authError] ||
                "Sign-in is unavailable right now.",
            )}
          </p>
        )}
        <div className="auth-switch">
          {t(signup ? "Already have an account?" : "New to Exclusive?")}{" "}
          <Link to={signup ? "/login" : "/signup"}>
            {t(signup ? "Log in" : "Sign up")}
          </Link>
        </div>
      </section>
    </main>
  );
}
