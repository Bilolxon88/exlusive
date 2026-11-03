import { useLanguage } from "../LanguageContext";
import { Link } from "react-router-dom";
export default function Breadcrumb({ items = [] }) {
  const { t } = useLanguage();
  return (
    <nav className="breadcrumb" aria-label={t("Breadcrumb")}>
      <Link to="/">{t("Home")}</Link>
      {items.map((item, i) => (
        <span key={i} className="contents">
          <span>/</span>
          {item.path ? (
            <Link to={item.path}>{t(item.label)}</Link>
          ) : (
            <span className="current">{t(item.label || item)}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
