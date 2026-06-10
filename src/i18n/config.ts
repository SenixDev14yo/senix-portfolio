export const locales = ["ru", "en", "uz"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export const localeNames: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  uz: "UZ",
};

export const localeFullNames: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  uz: "Oʻzbekcha",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
