import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  ru: () => import("./messages/ru.json").then((m) => m.default),
  en: () => import("./messages/en.json").then((m) => m.default),
  uz: () => import("./messages/uz.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["ru"]>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
