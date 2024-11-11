import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [hoveredBlock, setHoveredBlock] = useState(null);

  const blocksData = [
    { id: 'guides', title: 'Руководства', description: 'Теоретические материалы', icon: 'fas fa-book', link: '/guides' },
    { id: 'trainers', title: 'Тренажеры', description: 'Потренироваться', icon: 'fas fa-dumbbell', link: '/livecoding' },
    { id: 'tests', title: 'Тесты', description: 'Проверка знаний', icon: 'fas fa-tasks', link: '/tests' },
    { id: 'courses', title: 'Курсы', description: 'Список курсов (бесплатных и платных)', icon: 'fas fa-graduation-cap', link: '/courses' },
    { id: 'consultations', title: 'Консультации', description: 'Возможность бронирования консультаций с экспертами', icon: 'fas fa-chalkboard-teacher', link: '/consultation' },
    { id: 'events', title: 'Календарь событий', description: 'Вебинары, мастер-классы, запланированные мероприятия', icon: 'fas fa-calendar-alt', link: '/events' },
    { id: 'forum', title: 'Форум', description: 'Место для обсуждения вопросов', icon: 'fas fa-comments', link: '/forum' },
    { id: 'reviews', title: 'Отзывы', description: 'Отзывы пользователей о курсах и тренажерах', icon: 'fas fa-star', link: '/reviews' },
    { id: 'about', title: 'О проекте', description: 'Краткая информация о целях сайта', icon: 'fas fa-info-circle', link: '/about' },
  ];

  const handleMouseEnter = (index) => {
    setHoveredBlock(index);
  };

  const handleMouseLeave = () => {
    setHoveredBlock(null);
  };

  return (
    <div>
      <section className="blocks-container">
        {blocksData.map((block, index) => (
          <div
            className={`block ${hoveredBlock === index ? 'hovered' : ''}`}
            id={block.id}
            key={block.id}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => window.location.href = block.link}
          >
            <h2>
              <i className={block.icon}></i>
              <span className="text">{block.title}</span>
            </h2>
            <p>{block.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;