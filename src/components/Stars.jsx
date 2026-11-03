import { useLanguage } from "../LanguageContext";
export default function Stars({ rating = 5, reviews }) {
  const { t } = useLanguage();
  return (
    <div
      className="stars"
      aria-label={t("{rating} out of 5 stars, {reviews} reviews", {
        rating: rating,
        reviews: reviews,
      })}
    >
      <span>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={n <= Math.round(rating) ? "" : "star-empty"}>
            ★
          </span>
        ))}
      </span>
      <span className="review-count">({reviews})</span>
    </div>
  );
}
