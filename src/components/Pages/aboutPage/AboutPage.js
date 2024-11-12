import React, { useState, useEffect } from 'react';
import styles from './AboutPage.module.css'; // стили

const randomPhrases = [
    "QA — это не просто работа, это искусство!",
    "Каждая ошибка — это шаг к совершенству.",
    "Тестирование — это не просто проверка, это улучшение всего процесса.",
    "Каждый баг — это шанс сделать продукт лучше."
];

const AboutPage = () => {
    const [randomPhrase, setRandomPhrase] = useState(randomPhrases[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRandomPhrase(randomPhrases[Math.floor(Math.random() * randomPhrases.length)]);
        }, 5000); // обновляется каждые 5 секунд

        return () => clearInterval(interval); // очистка интервала при размонтировании
    }, []);

    return (
        <div className={`${styles.container} ${styles.block}`}>
            <h2 className={`${styles.heading} ${styles.neonEffect}`}>О проекте</h2>
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
            <p className={styles.paragraph}>{randomPhrase}</p>
        </div>
    );
};

export default AboutPage;
