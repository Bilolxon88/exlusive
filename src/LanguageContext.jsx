import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";
const LanguageContext = createContext(null);
export const languages = {
  uz: "O‘zbekcha",
  en: "English",
  ru: "Русский",
};
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return languages[localStorage.getItem("exclusive-language")]
        ? localStorage.getItem("exclusive-language")
        : "uz";
    } catch {
      return "uz";
    }
  });
  function t(text, values = {}) {
    let result =
      language === "en" ? text : (translations[language]?.[text] ?? text);
    for (const key in values)
      result = result.replaceAll(`{${key}}`, String(values[key]));
    return result;
  }
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem("exclusive-language", language);
    } catch {}
  }, [language]);
  function validateForm(form) {
    const invalid = [...form.elements].find(
      (field) =>
        field.validity &&
        (!field.validity.valid || (field.required && !field.value.trim())),
    );
    if (!invalid) return "";
    invalid.focus();
    if (
      invalid.validity.valueMissing ||
      (invalid.required && !invalid.value.trim())
    )
      return t("Please complete all required fields.");
    if (invalid.validity.typeMismatch)
      return t("Please enter a valid email address.");
    if (invalid.validity.tooShort)
      return t("Please enter at least 6 characters for your password.");
    return t("Please check the highlighted field.");
  }
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        validateForm,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
export const useLanguage = () => useContext(LanguageContext);
