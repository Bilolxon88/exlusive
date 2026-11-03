import { useLanguage } from "../LanguageContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { sideCategories } from "../data";
import { asset } from "../utils";
export default function Hero() {
  const { t } = useLanguage();
  const [slide, setSlide] = useState(0);
  const slides = [
    {
      label: "iPhone 14 Series",
      title: (
        <>
          {t("Up to 10%")}
          <br />
          {t("off Voucher")}
        </>
      ),
      image: "iphone.png",
      category: "Phones",
    },
    {
      label: "JBL Boombox 2",
      title: (
        <>
          {t("Turn up")}
          <br />
          {t("the good times.")}
        </>
      ),
      image: "jbl.png",
      category: "Headphones",
    },
    {
      label: "Play beyond limits",
      title: (
        <>
          {t("A new level")}
          <br />
          {t("of gaming.")}
        </>
      ),
      image: "playstation.svg",
      category: "Gaming",
    },
    {
      label: "Capture every moment",
      title: (
        <>
          {t("Find a new")}
          <br />
          {t("perspective.")}
        </>
      ),
      image: "camera.svg",
      category: "Cameras",
    },
    {
      label: "Made for your setup",
      title: (
        <>
          {t("Make room")}
          <br />
          {t("for more.")}
        </>
      ),
      image: "monitor.png",
      category: "Computers",
    },
  ];
  const current = slides[slide];
  return (
    <div className="home-hero">
      <aside className="category-sidebar" aria-label={t("Product categories")}>
        {sideCategories.map((c, i) => (
          <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`}>
            {t(c)}
            {i < 2 && <ChevronRight size={18} />}
          </Link>
        ))}
      </aside>
      <section className="hero-banner">
        <div className="hero-copy">
          <div className="hero-kicker">
            {slide === 0 ? (
              <img
                className="apple-logo"
                src={asset("apple.png")}
                alt={t("Apple")}
              />
            ) : null}
            {t(current.label)}
          </div>
          <h1>{current.title}</h1>
          <Link to={`/shop?category=${current.category}`} className="shop-link">
            {t("Shop Now")}
            <ArrowRight size={23} />
          </Link>
        </div>
        <img
          className={`hero-product slide-${slide}`}
          fetchPriority="high"
          width="496"
          height="328"
          src={asset(current.image)}
          alt={t(current.label)}
        />
        <div className="hero-dots" aria-label={t("Featured collections")}>
          {slides.map((s, i) => (
            <button
              key={s.label}
              className={slide === i ? "active" : ""}
              aria-label={t("Show {name}", {
                name: t(s.label),
              })}
              aria-pressed={slide === i}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
