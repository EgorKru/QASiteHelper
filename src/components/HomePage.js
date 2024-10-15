// src/components/HomePage.js
import React from 'react'; // Импортируем React
import './HomePage.css'; // Импортируем CSS для стилизации страницы

// Компонент для главной страницы
const HomePage = () => {
    // Данные для блоков на главной странице
    const blocksData = [
        {
            id: 'guides', // Уникальный идентификатор блока
            title: 'Руководства', // Заголовок блока
            description: 'Теоретические материалы', // Описание блока
            icon: 'fas fa-book', // Иконка блока (Font Awesome)
            link: '/guides', // Ссылка на страницу
        },
        {
            id: 'trainers',
            title: 'Тренажеры',
            description: 'Потренироваться',
            icon: 'fas fa-dumbbell',
            link: '/trainers',
        },
        {
            id: 'tests',
            title: 'Тесты',
            description: 'Проверка знаний',
            icon: 'fas fa-tasks',
            link: '/tests',
        },
        {
            id: 'courses',
            title: 'Курсы',
            description: 'Список курсов (бесплатных и платных)',
            icon: 'fas fa-graduation-cap',
            link: '/courses',
        },
        {
            id: 'consultations',
            title: 'Консультации',
            description: 'Возможность бронирования консультаций с экспертами',
            icon: 'fas fa-chalkboard-teacher',
            link: '/consultation',
        },
        {
            id: 'events',
            title: 'Календарь событий',
            description: 'Вебинары, мастер-классы, запланированные мероприятия',
            icon: 'fas fa-calendar-alt',
            link: '/events',
        },
        {
            id: 'forum',
            title: 'Форум',
            description: 'Место для обсуждения вопросов',
            icon: 'fas fa-comments',
            link: '/forum',
        },
        {
            id: 'reviews',
            title: 'Отзывы',
            description: 'Отзывы пользователей о курсах и тренажерах',
            icon: 'fas fa-star',
            link: '/reviews',
        },
        {
            id: 'about',
            title: 'О проекте',
            description: 'Краткая информация о целях сайта',
            icon: 'fas fa-info-circle',
            link: '/about',
        },
    ];

    return (
        <div>
            <h2></h2> {/* Заголовок страницы (можно добавить текст) */}
            <p></p> {/* Описание страницы (можно добавить текст) */}
            <section className="blocks-container"> {/* Контейнер для блоков */}
                {blocksData.map(block => (
                    <div
                        className="block" // Класс для стилизации блока
                        id={block.id} // Уникальный идентификатор блока
                        key={block.id} // Уникальный ключ для React
                        onClick={() => window.location.href = block.link} // Переход по ссылке при клике
                    >
                        <h2>
                            <i className={block.icon}></i> {block.title} {/* Иконка и заголовок блока */}
                        </h2>
                        <p>{block.description}</p> {/* Описание блока */}
                    </div>
                ))}
            </section>
        </div>
    );
};

// Экспортируем компонент для использования в других частях приложения
export default HomePage;
