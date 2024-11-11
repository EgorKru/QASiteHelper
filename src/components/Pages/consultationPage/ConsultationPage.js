// src/components/ConsultationPage.js
import React, { useState, useEffect } from 'react';
import styles from './ConsultationPage.css'; // импорт стилей

// компонент для страницы "Консультации"(на уровне задумок)
const ConsultationPage = () => {
    const [timeLeft, setTimeLeft] = useState("01:30:00"); // время до ближайшей консультации

    // простая логика для таймера обратного отсчета
    useEffect(() => {
        const countdown = setInterval(() => {
            // Здесь можно добавить логику обновления времени до консультации.
            setTimeLeft("01:29:59"); // пример для демонстрации
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Консультации</h2>
            <p className={styles.description}>
                Получите персональные советы и поддержку от наших экспертов!
            </p>
            <div className={styles.timerContainer}>
                <p className={styles.timerText}>Ближайшая консультация через:</p>
                <span className={styles.timer}>{timeLeft}</span>
            </div>
            <p className={styles.note}>
                Забронируйте консультацию, выбрав удобное для вас время.
            </p>
            <button className={styles.bookButton}>Записаться на консультацию</button>
        </div>
    );
};

export default ConsultationPage;
