import "server-only";

const dictionaries = {
  ru: () => import("./ru.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
};

export const getAuthModalDict = async (locale: "ru" | "en") =>
  dictionaries[locale]();
