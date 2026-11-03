import { useLanguage } from "../LanguageContext";
import { useEffect, useState } from "react";
export default function Countdown() {
  const { t } = useLanguage();
  const [left, setLeft] = useState(() => {
    let end = Number(localStorage.getItem("exclusive-sale-end"));
    if (!end || end < Date.now()) {
      end = Date.now() + 3 * 86400000 + 23 * 3600000 + 19 * 60000 + 56000;
      localStorage.setItem("exclusive-sale-end", String(end));
    }
    return Math.max(0, Math.floor((end - Date.now()) / 1000));
  });
  useEffect(() => {
    let timer = setInterval(() => setLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="countdown">
      {[
        ["Days", Math.floor(left / 86400)],
        ["Hours", Math.floor(left / 3600) % 24],
        ["Minutes", Math.floor(left / 60) % 60],
        ["Seconds", left % 60],
      ].map(([label, value], i) => (
        <div key={label}>
          <small>{t(label)}</small>
          <b>{String(value).padStart(2, "0")}</b>
          {i < 3 && <em>:</em>}
        </div>
      ))}
    </div>
  );
}
