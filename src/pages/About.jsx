import { useLanguage } from "../LanguageContext";
import {
  Store,
  DollarSign,
  ShoppingBag,
  Wallet,
  Instagram,
  Linkedin,
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import Services from "../components/Services";
import { asset } from "../utils";
export default function About() {
  const { t } = useLanguage();
  return (
    <>
      <main className="container page-main">
        <Breadcrumb items={["About"]} />
        <section className="story">
          <div>
            <h1>{t("Our Story")}</h1>
            <p>
              {t(
                "Launched in 2015, Exclusive is South Asia\u2019s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.",
              )}
            </p>
            <p>
              {t(
                "Exclusive has more than 1 million products to offer, growing at a very fast rate. Exclusive offers a diverse assortment in categories ranging from consumer electronics to fashion and home essentials.",
              )}
            </p>
          </div>
          <img
            src={asset("about.png")}
            alt={t("Two friends enjoying a day of shopping")}
          />
        </section>
        <div className="stats-grid">
          {[
            [Store, "10.5k", "Sellers active on our site"],
            [DollarSign, "33k", "Monthly product sales"],
            [ShoppingBag, "45.5k", "Customers active on our site"],
            [Wallet, "25k", "Annual gross sales on our site"],
          ].map(([Icon, num, label], i) => (
            <article className={i === 1 ? "stat featured" : "stat"} key={num}>
              <span className="service-icon">
                <Icon size={30} />
              </span>
              <h2>{num}</h2>
              <p>{t(label)}</p>
            </article>
          ))}
        </div>
        <section className="team-grid">
          {[
            ["tom.png", "Tom Cruise", "Founder & Chairman"],
            ["emma.png", "Emma Watson", "Managing Director"],
            ["will.png", "Will Smith", "Product Designer"],
          ].map(([img, name, role]) => (
            <article key={name}>
              <div className="team-image">
                <img src={asset(img)} alt={name} />
              </div>
              <h2>{name}</h2>
              <p>{t(role)}</p>
              <div className="team-links">
                <Instagram size={20} />
                <Linkedin size={20} />
              </div>
            </article>
          ))}
        </section>
      </main>
      <Services />
    </>
  );
}
