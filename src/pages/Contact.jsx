import { useLanguage } from "../LanguageContext";
import { useState } from "react";
import { Phone, Mail, Check } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
export default function Contact() {
  const { t, validateForm } = useLanguage();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  return (
    <main className="container page-main">
      <Breadcrumb items={["Contact"]} />
      <h1 className="sr-only">{t("Contact")}</h1>
      <div className="contact-grid">
        <aside className="contact-info">
          <section>
            <h2>
              <span>
                <Phone size={20} />
              </span>
              {t("Call To Us")}
            </h2>
            <p>{t("We are available 24/7, 7 days a week.")}</p>
            <a href="tel:+8801611112222">{t("Phone: +8801611112222")}</a>
          </section>
          <section>
            <h2>
              <span>
                <Mail size={20} />
              </span>
              {t("Write To Us")}
            </h2>
            <p>
              {t("Fill out our form and we will contact")}
              <br />
              {t("you within 24 hours.")}
            </p>
            <a href="mailto:customer@exclusive.com">
              {t("Emails: customer@exclusive.com")}
            </a>
            <a href="mailto:support@exclusive.com">
              {t("Emails: support@exclusive.com")}
            </a>
          </section>
        </aside>
        {sent ? (
          <section className="contact-form form-success">
            <Check size={40} />
            <h2>{t("Thank you for reaching out.")}</h2>
            <p>{t("Contact form preview only. No message is sent.")}</p>
            <button className="btn" onClick={() => setSent(false)}>
              {t("Write another message")}
            </button>
          </section>
        ) : (
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              const invalid = validateForm(e.currentTarget);
              if (invalid) {
                setError(invalid);
                return;
              }
              setError("");
              setSent(true);
            }}
            noValidate
          >
            <div className="contact-inputs">
              <input
                required
                aria-label={t("Your name")}
                placeholder={t("Your Name *")}
              />
              <input
                required
                type="email"
                aria-label={t("Your email")}
                placeholder={t("Your Email *")}
              />
              <input
                required
                type="tel"
                aria-label={t("Your phone")}
                placeholder={t("Your Phone *")}
              />
            </div>
            <textarea
              required
              aria-label={t("Your message")}
              placeholder={t("Your Message")}
              rows={8}
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="contact-form-bottom">
              <button className="btn">{t("Send Message")}</button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
