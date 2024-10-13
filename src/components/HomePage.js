// src/components/HomePage.js
import React from 'react';
import './HomePage.css';

const HomePage = () => {
    const blocksData = [
        {
            id: 'guides',
            title: 'Руководства',
            description: 'Теоретические материалы',
            icon: 'fas fa-book',
            link: '/guides',
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
            id: 'aboutp',
            title: 'О проекте',
            description: 'Краткая информация о целях сайта',
            icon: 'fas fa-info-circle',
            link: '/about',
        },
    ];

    return (
        <div>
            <h2></h2>
            <p></p>
            <section className="blocks-container">
                {blocksData.map(block => (
                    <div
                        className="block"
                        id={block.id}
                        key={block.id}
                        onClick={() => window.location.href = block.link} //переход по ссылке
                    >
                        <h2>
                            <i className={block.icon}></i> {block.title}
                        </h2>
                        <p>{block.description}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default HomePage;
