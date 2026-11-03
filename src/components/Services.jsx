import { useLanguage } from "../LanguageContext";
import { Truck, Headphones, ShieldCheck } from "lucide-react";
export default function Services() {
  const { t } = useLanguage();
  return (
    <div className="services container">
      {[
        [
          Truck,
          "FREE AND FAST DELIVERY",
          "Free delivery for all orders over $140",
        ],
        [Headphones, "24/7 CUSTOMER SERVICE", "Friendly 24/7 customer support"],
        [ShieldCheck, "MONEY BACK GUARANTEE", "We return money within 30 days"],
      ].map(([Icon, title, desc]) => (
        <div key={title}>
          <span className="service-icon">
            <Icon size={30} />
          </span>
          <h3>{t(title)}</h3>
          <p>{t(desc)}</p>
        </div>
      ))}
    </div>
  );
}
