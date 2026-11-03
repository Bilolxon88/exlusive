import { useLanguage } from "../LanguageContext";
export default function SectionTitle({ label, title, children }) {
  const { t } = useLanguage();
  return (
    <div className="section-title">
      <div className="eyebrow">
        <span />
        {t(label)}
      </div>
      <div className="section-title-row">
        <h2>{t(title)}</h2>
        {children}
      </div>
    </div>
  );
}
