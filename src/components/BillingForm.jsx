import { useLanguage } from "../LanguageContext";
export default function BillingForm({ saved, profile }) {
  const { t } = useLanguage();
  return (
    <section className="billing-form">
      {[
        [
          "firstName",
          "First Name",
          true,
          "text",
          saved.firstName || profile?.firstName,
        ],
        ["company", "Company Name", false, "text", saved.company],
        ["address", "Street Address", true, "text", saved.address],
        [
          "apartment",
          "Apartment, floor, etc. (optional)",
          false,
          "text",
          saved.apartment,
        ],
        ["city", "Town/City", true, "text", saved.city],
        ["phone", "Phone Number", true, "tel", saved.phone],
        [
          "email",
          "Email Address",
          true,
          "email",
          saved.email || profile?.email,
        ],
      ].map(([name, label, required, type, value]) => (
        <label className="field" key={name}>
          {t(label)}
          {required && <span className="text-red-500">*</span>}
          <input
            name={name}
            type={type}
            required={required}
            defaultValue={value || ""}
            autoComplete={
              {
                firstName: "given-name",
                address: "street-address",
                city: "address-level2",
                phone: "tel",
                email: "email",
              }[name]
            }
          />
        </label>
      ))}
      <label className="checkbox-label">
        <input type="checkbox" name="save" defaultChecked />
        {t("Save this information for faster check-out next time")}
      </label>
    </section>
  );
}
