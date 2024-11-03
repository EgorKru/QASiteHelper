// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                "aboutTitle": "About the Project",
                "aboutDescription1": "This is an educational resource for QA specialists.",
                "aboutDescription2": "The goal of the site is to provide users with access to various materials for learning and practice."
            }
        },
        ru: {
            translation: {
                "aboutTitle": "О проекте",
                "aboutDescription1": "Это образовательный ресурс для QA специалистов.",
                "aboutDescription2": "Цель сайта - предоставить пользователям доступ к различным материалам для обучения и практики."
            }
        }
    },
    lng: "ru", // язык по умолчанию
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;