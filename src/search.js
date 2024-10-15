const documents = [
    { name: "Главная", path: "/", content: "Добро пожаловать на главную страницу." },
    { name: "Вход", path: "/login", content: "Войдите в свою учетную запись." },
    { name: "О нас", path: "/about", content: "Мы - платформа для помощи в вопросах." },
    { name: "Консультации", path: "/consultation", content: "Получите консультации от наших экспертов." },
    { name: "Контакты", path: "/contacts", content: "Свяжитесь с нами через контактные данные." },
    { name: "События", path: "/events", content: "Посетите наши предстоящие события." },
    { name: "Часто задаваемые вопросы", path: "/faq", content: "Ответы на часто задаваемые вопросы." },
    { name: "Форум", path: "/forum", content: "Обсуждайте темы на нашем форуме." },
    { name: "Отзывы", path: "/reviews", content: "Читать отзывы о нашей платформе." },
];

// Функция для поиска
export const search = (query) => {
    return documents.filter(doc =>
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.content.toLowerCase().includes(query.toLowerCase())
    );
};

