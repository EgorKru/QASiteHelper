// src/components/FAQPage.js
import React, { useState } from 'react'; // Импортируем React и useState для управления состоянием

// Компонент для страницы "Часто задаваемые вопросы"(тест)
const FAQPage = () => {
    const [open, setOpen] = useState(null); // Состояние для открытия/закрытия вопроса

    // Функция для переключения состояния вопроса
    const toggleAnswer = (index) => {
        setOpen(open === index ? null : index); // Если вопрос открыт, закрыть его, иначе открыть новый
    };

    const questions = [
        { question: "Как зарегистрироваться?", answer: "Перейдите на страницу регистрации и заполните форму." },
        { question: "Где найти справочник?", answer: "Справочник доступен на странице 'Ресурсы'." },
        { question: "Как восстановить пароль?", answer: "Используйте форму восстановления пароля на странице входа." },
    ];

    return (
        <div>
            <h2>Часто задаваемые вопросы</h2>
            <div>
                {questions.map((item, index) => (
                    <div key={index}>
                        <h3 onClick={() => toggleAnswer(index)} style={{ cursor: 'pointer', color: '#007bff' }}>
                            {item.question}
                        </h3>
                        {open === index && <p>{item.answer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Экспортируем компонент для использования в других частях приложения
export default FAQPage;
