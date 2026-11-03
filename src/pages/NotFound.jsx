import { useLanguage } from "../LanguageContext";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
export default function NotFound() {
  const { t } = useLanguage();
  return (
    <main className="container page-main">
      <Breadcrumb items={["404 Error"]} />
      <div className="not-found">
        <h1>{t("404 Not Found")}</h1>
        <p>{t("Your visited page not found. You may go home page.")}</p>
        <Link to="/" className="btn">
          {t("Back to home page")}
        </Link>
      </div>
    </main>
  );
}
