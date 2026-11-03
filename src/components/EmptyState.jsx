import { useLanguage } from "../LanguageContext";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
export default function EmptyState({
  icon: Icon = ShoppingCart,
  title,
  description,
}) {
  const { t } = useLanguage();
  return (
    <div className="empty-state">
      <span>
        <Icon size={44} strokeWidth={1.3} />
      </span>
      <h2>{t(title)}</h2>
      <p>{t(description)}</p>
      <Link to="/shop" className="btn">
        {t("Explore Products")}
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}
