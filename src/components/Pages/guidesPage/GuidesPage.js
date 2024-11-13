import React, { useState, useCallback, useMemo, useReducer, memo, Suspense } from 'react';
import classNames from 'classnames';
import styles from './Sidebar.module.css';

// Reducer для управления состоянием открытых секций
const openSectionsReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE':
            return { ...state, [action.slug]: !state[action.slug] };
        default:
            return state;
    }
};

const GuidesPage = () => {
    const [activeSection, setActiveSection] = useState('intro-to-sql');
    const [openSections, dispatch] = useReducer(openSectionsReducer, {});

    const sections = useMemo(() => new Set(['introduction', 'sql-basics', 'advanced-sql']), []);

    const handleChangeSection = useCallback((section) => {
        if (sections.has(section)) {
            setActiveSection(section);
        }
    }, [sections]);

    return (
        <div className="guides-container">
            <Sidebar
                changeSection={handleChangeSection}
                activeSection={activeSection}
                openSections={openSections}
                dispatch={dispatch}
            />
            <div className="guide-content-container">
                <Suspense fallback={<div>Loading...</div>}>
                    <GuideContent activeSection={activeSection} />
                </Suspense>
            </div>
        </div>
    );
};

const Sidebar = ({ changeSection, activeSection, openSections, dispatch }) => {
    const guides = useMemo(() => [
        {
            id: 1,
            title: 'Заголовок',
            slug: 'introduction',
            description: 'Подраздел',
            children: [
                { id: 11, title: 'Устройство платформы', slug: 'platform-structure', children: [] },
                { id: 12, title: 'Сообщество', slug: 'community', children: [] }
            ]
        },
        {
            id: 2,
            title: 'Заголовок',
            slug: 'basics',
            description: 'Подраздел',
            children: [
                { id: 21, title: 'Введение в SQL', slug: 'intro-to-sql', children: [] },
                { id: 22, title: 'Основные команды SQL', slug: 'sql-commands', children: [] }
            ]
        },
        {
            id: 3,
            title: 'Заголовок',
            slug: 'advanced',
            description: 'Подраздел',
            children: [
                { id: 31, title: 'Подзапросы', slug: 'subqueries', children: [] },
                { id: 32, title: 'Оптимизация запросов', slug: 'query-optimization', children: [] }
            ]
        }
    ], []);

    // Переключение состояния секции
    const toggleSection = useCallback((slug) => {
        dispatch({ type: 'TOGGLE', slug });
    }, [dispatch]);

    const SectionItem = memo(({ section }) => (
        <div className={styles.sectionItem}>
            <div
                onClick={() => {
                    changeSection(section.slug);
                    if (section.children.length > 0) toggleSection(section.slug);
                }}
                className={classNames(styles.sectionTitle, {
                    [styles.sectionTitleActive]: activeSection === section.slug
                })}
            >
                <span
                    className={classNames(styles.bullet, {
                        [styles.bulletActive]: activeSection === section.slug
                    })}
                ></span>
                {section.title}
            </div>
            {section.description && <p className={styles.description}>{section.description}</p>}
            {section.children.length > 0 && openSections[section.slug] && (
                <div className={styles.childContainer}>
                    {section.children.map(child => (
                        <SectionItem key={child.id} section={child} />
                    ))}
                </div>
            )}
        </div>
    ));

    return (
        <nav className={styles.sidebar}>
            <h2>Руководства</h2>
            {guides.map(section => (
                <SectionItem key={section.id} section={section} />
            ))}
        </nav>
    );
};

const GuideContent = ({ activeSection }) => {
    const content = {
        'intro-to-sql': <IntroToSQL />,
        'creating-databases': <CreatingDatabases />,
        'working-with-queries': <WorkingWithQueries />
    };

    return (
        <div className="content-container">
            {content[activeSection] || <div>Выберите раздел для начала.</div>}
        </div>
    );
};

const IntroToSQL = () => (
    <div>
        <h1>Введение в SQL</h1>
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

export default GuidesPage;
