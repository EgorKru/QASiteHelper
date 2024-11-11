import React, { useEffect } from 'react';
import './CoursesPage.css'; // Подключаем обновленные стили

const CoursesPage = () => {
    // Функция для параллакс-эффекта
    useEffect(() => {
        const container = document.querySelector('.container');
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            container.style.backgroundPositionY = `${scrollPosition * 0.2}px`;
        });
    }, []);

    return (
        <div className="container">
            <h2 className="heading">Курсы для начинающих QA</h2>
            <p className="description"> </p>
            <div className="courseList">
                <div className="courseCard">
                    <a href="/course/1">
                        <h3>Основы тестирования</h3>
                        <p>Узнайте о базовых принципах тестирования и его значении в IT.</p>
                    </a>
                </div>
                <div className="courseCard">
                    <a href="/course/2">
                        <h3>Автоматизация тестирования</h3>
                        <p>Познакомьтесь с языками программирования и инструментами для автоматизации тестирования.</p>
                    </a>
                </div>
                <div className="courseCard">
                    <a href="/course/3">
                        <h3>Продвинутое тестирование</h3>
                        <p>Углубленные материалы для уверенных пользователей и будущих лидеров QA.</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
