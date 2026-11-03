import { useLanguage } from "../LanguageContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
} from "lucide-react";
import { products } from "../data";
import ProductGrid from "../components/ProductGrid";
import SectionTitle from "../components/SectionTitle";
import Services from "../components/Services";
import BackToTop from "../components/BackToTop";
import Countdown from "../components/Countdown";
import Hero from "../components/Hero";
import { asset } from "../utils";
const categories = [
  [Smartphone, "Phones"],
  [Monitor, "Computers"],
  [Watch, "SmartWatch"],
  [Camera, "Cameras"],
  [Headphones, "Headphones"],
  [Gamepad2, "Gaming"],
];
export default function Home() {
  const { t } = useLanguage();
  const [offset, setOffset] = useState(0);
  const flash = products.slice(0, 4);
  const rotated = [...flash.slice(offset), ...flash.slice(0, offset)];
  return (
    <>
      <main className="container">
        <Hero />
        <section className="home-section flash-section">
          <SectionTitle label="Today’s" title={t("Flash Sales")}>
            <Countdown />
            <div className="section-arrows">
              <button
                aria-label={t("Previous sale products")}
                onClick={() => setOffset((offset + 3) % 4)}
              >
                <ArrowLeft size={23} />
              </button>
              <button
                aria-label={t("Next sale products")}
                onClick={() => setOffset((offset + 1) % 4)}
              >
                <ArrowRight size={23} />
              </button>
            </div>
          </SectionTitle>
          <ProductGrid items={rotated} />
          <div className="section-cta">
            <Link to="/shop?collection=sale" className="btn">
              {t("View All Products")}
            </Link>
          </div>
        </section>
        <section className="home-section category-section">
          <SectionTitle label="Categories" title={t("Browse By Category")} />
          <div className="category-grid">
            {categories.map(([Icon, label]) => (
              <Link
                key={label}
                className={
                  label === "Cameras"
                    ? "category-tile featured"
                    : "category-tile"
                }
                to={`/shop?category=${encodeURIComponent(label)}`}
              >
                <Icon size={49} strokeWidth={1.3} />
                <span>{t(label)}</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="home-section best-section">
          <SectionTitle label="This Month" title={t("Best Selling Products")}>
            <Link to="/shop?collection=best" className="btn ml-auto">
              {t("View All")}
            </Link>
          </SectionTitle>
          <ProductGrid items={products.slice(4, 8)} />
        </section>
        <section className="music-banner">
          <div className="music-copy">
            <span>{t("Categories")}</span>
            <h2>
              {t("Enhance Your")}
              <br />
              {t("Music Experience")}
            </h2>
            <div className="music-timer">
              {[
                ["23", "Hours"],
                ["05", "Days"],
                ["59", "Minutes"],
                ["35", "Seconds"],
              ].map(([num, l]) => (
                <div key={l}>
                  <b>{num}</b>
                  <small>{t(l)}</small>
                </div>
              ))}
            </div>
            <Link to="/product/speaker" className="btn btn-green">
              {t("Buy Now!")}
            </Link>
          </div>
          <img
            loading="lazy"
            decoding="async"
            src={asset("jbl.png")}
            alt={t("JBL Boombox 2 portable speaker")}
          />
        </section>
        <section className="home-section explore-section">
          <SectionTitle label="Our Products" title={t("Explore Our Products")}>
            <Link
              to="/shop"
              className="round-link ml-auto"
              aria-label={t("Explore all products")}
            >
              <ArrowRight size={23} />
            </Link>
          </SectionTitle>
          <ProductGrid items={products.slice(8, 16)} />
          <div className="section-cta">
            <Link to="/shop" className="btn">
              {t("View All Products")}
            </Link>
          </div>
        </section>
        <section className="home-section arrivals-section">
          <SectionTitle label="Featured" title={t("New Arrival")} />
          <div className="arrivals-grid">
            <Link to="/shop?category=Gaming" className="arrival arrival-ps">
              <img
                loading="lazy"
                decoding="async"
                src={asset("playstation.svg")}
                alt={t("PlayStation 5")}
              />
              <div>
                <h3>{t("PlayStation 5")}</h3>
                <p>
                  {t("Black and White version of the PS5")}
                  <br />
                  {t("coming out on sale.")}
                </p>
                <span>{t("Shop Now")}</span>
              </div>
            </Link>
            <Link
              to={`/shop?category=${encodeURIComponent("Woman’s Fashion")}`}
              className="arrival arrival-women"
            >
              <img
                loading="lazy"
                decoding="async"
                src={asset("women.svg")}
                alt={t("Woman’s fashion collection")}
              />
              <div>
                <h3>{t("Women\u2019s Collections")}</h3>
                <p>
                  {t("Featured woman collections that")}
                  <br />
                  {t("give you another vibe.")}
                </p>
                <span>{t("Shop Now")}</span>
              </div>
            </Link>
            <Link to="/product/speaker" className="arrival arrival-small">
              <img
                loading="lazy"
                decoding="async"
                src={asset("speakers.svg")}
                alt={t("Amazon wireless speakers")}
              />
              <div>
                <h3>{t("Speakers")}</h3>
                <p>{t("Amazon wireless speakers")}</p>
                <span>{t("Shop Now")}</span>
              </div>
            </Link>
            <Link
              to="/shop?category=Health%20%26%20Beauty"
              className="arrival arrival-small"
            >
              <img
                loading="lazy"
                decoding="async"
                src={asset("perfume.svg")}
                alt={t("Gucci perfume")}
              />
              <div>
                <h3>{t("Perfume")}</h3>
                <p>{t("GUCCI INTENSE OUD EDP")}</p>
                <span>{t("Shop Now")}</span>
              </div>
            </Link>
          </div>
        </section>
      </main>
      <Services />
      <BackToTop />
    </>
  );
}
