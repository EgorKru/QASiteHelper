// src/components/CoursesPage.js

import React from 'react';
import styles from './CoursesPage.module.css'; // Импортируем стили

const CoursesPage = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Курсы для начинающих QA</h2>
            <p className={styles.description}>
                Добро пожаловать в мир качественного обучения! Здесь вы найдете структурированные курсы,
                которые помогут вам начать путь к профессионалу в QA.
            </p>
            <div className={styles.courseList}>
                <div className={styles.courseCard}>
                    <h3>Основы тестирования</h3>
                    <p>Узнайте о базовых принципах тестирования и его важности в IT.</p>
                </div>
                <div className={styles.courseCard}>
                    <h3>Автоматизация тестирования</h3>
                    <p>Познакомьтесь с языками программирования и инструментами, которые автоматизируют тестирование.</p>
                </div>
                <div className={styles.courseCard}>
                    <h3>Продвинутое тестирование</h3>
                    <p>Углубленные материалы для уверенных пользователей и будущих лидеров QA.</p>
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
