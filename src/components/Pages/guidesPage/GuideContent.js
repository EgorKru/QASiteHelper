// GuideContent.js
import React from 'react';

const GuideContent = ({ activeSection }) => {
    const content = {
        'intro-to-sql': (
            <IntroToSQL />
        ),
        'creating-databases': (
            <CreatingDatabases />
        ),
        'working-with-queries': (
            <WorkingWithQueries />
        ),
        // Добавляйте компоненты для других разделов здесь
    };

    return (
        <div className="content-container">
            {content[activeSection] || <div>.</div>}
        </div>
    );
};

const IntroToSQL = () => (
    <div>
        <h1>Заголовок</h1>
        <p>SQL (Structured Query Language) — это язык для управления и обработки данных в реляционных базах данных.</p>
        <h2>Основные команды</h2>
        <p>Вы можете использовать такие команды, как <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, и <code>DELETE</code> для выполнения операций в базе данных.</p>
    </div>
);

const CreatingDatabases = () => (
    <div>
        <h1>Создание баз данных</h1>
        <p>Для создания базы данных используется команда <code>CREATE DATABASE</code>, а для создания таблицы — <code>CREATE TABLE</code>.</p>
        <h2>Пример</h2>
        <pre>
            <code>
                CREATE DATABASE School;
                CREATE TABLE Students (
                    id INT PRIMARY KEY,
                    name VARCHAR(100),
                    age INT
                );
            </code>
        </pre>
    </div>
);

const WorkingWithQueries = () => (
    <div>
        <h1>Работа с запросами</h1>
        <p>SQL-запросы позволяют извлекать, обновлять и удалять данные из базы данных.</p>
        <h2>Пример запроса</h2>
        <pre>
            <code>
                SELECT name, age FROM Students WHERE age &gt; 18;
            </code>
        </pre>
    </div>
);

export default GuideContent;
