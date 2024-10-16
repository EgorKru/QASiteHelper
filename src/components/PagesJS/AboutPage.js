// src/components/AboutPage.js
import React from 'react';
import styles from './AboutPage.module.css'; // Импортируем стили

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>О проекте</h2>
            <p className={styles.paragraph}>
                Добро пожаловать на наш образовательный ресурс для специалистов в области QA!
            </p>
            <p className={styles.paragraph}>
                Мы создали эту платформу, чтобы вдохновлять и поддерживать ваше профессиональное развитие. 
                Здесь вы найдете обширную библиотеку материалов, которые помогут вам не только освоить 
                теоретические знания, но и эффективно применить их на практике.
            </p>
            <p className={styles.paragraph}>
                Наша команда регулярно обновляет контент, чтобы предоставить вам самые актуальные и 
                полезные ресурсы. Присоединяйтесь к нашему сообществу QA и развивайтесь вместе с нами!
            </p>
            <p className={styles.paragraph}>
                Мы ценим ваше время и стремимся сделать процесс обучения максимально удобным и 
                доступным. Ваш успех — наша цель!
            </p>
        </div>
    );
};

export default AboutPage;
