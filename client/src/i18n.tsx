import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

 import translationAR from "./locales/ar/translation.json";
 import translationEN from "./locales/en/translation.json";

const env = process.env.NODE_ENV;

const resources = {
 ar: {
   translation: translationAR
 },
 en: {
   translation: translationEN
 }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    resources,
    lng: "ar",
    fallbackLng: 'ar',
    debug: env === 'development' ? true : false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
