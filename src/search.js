// src/search.js
const documents = [
    {
        name: "Главная",
        content: "Добро пожаловать на главную страницу. Здесь вы можете узнать больше о нашей платформе."
    },
    {
        name: "Вход",
        content: "Войдите в свою учетную запись."
    },
    {
        name: "О нас",
        content: "Мы - платформа для помощи в вопросах. Мы предлагаем консультации и информацию."
    },
    {
        name: "Консультации",
        content: "Получите консультации от наших экспертов."
    },
    {
        name: "Контакты",
        content: "Свяжитесь с нами через контактные данные."
    },
    {
        name: "События",
        content: "Посетите наши предстоящие события."
    },
    {
        name: "Часто задаваемые вопросы",
        content: "Ответы на часто задаваемые вопросы."
    },
    {
        name: "Форум",
        content: "Обсуждайте темы на нашем форуме."
    },
    {
        name: "Отзывы",
        content: "Читать отзывы о нашей платформе."
    },
];

// Функция для поиска
export const search = (query) => {
    return documents.filter(doc =>
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.content.toLowerCase().includes(query.toLowerCase())
    );
};
