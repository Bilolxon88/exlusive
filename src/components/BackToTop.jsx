import { useLanguage } from "../LanguageContext";
import { ArrowUp } from "lucide-react";
export default function BackToTop() {
  const { t } = useLanguage();
  return (
    <button
      className="back-to-top"
      aria-label={t("Back to top")}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    >
      <ArrowUp size={22} />
    </button>
  );
}
