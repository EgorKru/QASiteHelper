import React, { useState, useCallback, memo, Suspense } from 'react';
import classNames from 'classnames';
import styles from './Sidebar.module.css';

// Рекурсивный компонент для вложенных секций
const SectionItem = memo(({ section, changeSection, activeSection, openSections, toggleSection }) => {
    return (
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
                        <SectionItem
                            key={child.id}
                            section={child}
                            changeSection={changeSection}
                            activeSection={activeSection}
                            openSections={openSections}
                            toggleSection={toggleSection}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

const Sidebar = ({ changeSection, activeSection, openSections, dispatch }) => {
    const guides = useMemo(() => [
        // Пример структуры данных для гайдс
        {
            id: 1,
            title: 'Введение',
            slug: 'introduction',
            description: 'Заголовок',
            children: [
                { id: 11, title: 'Устройство платформы', slug: 'platform-structure', children: [] },
                { id: 12, title: 'Сообщество', slug: 'community', children: [] }
            ]
        },
        {
            id: 2,
            title: 'Заголовок',
            slug: 'sql-basics',
            description: 'Заголовок',
            children: [
                { id: 21, title: 'Подзаголовок', slug: 'intro-to-sql', children: [] },
                { id: 22, title: 'подзаголовок2', slug: 'sql-commands', children: [] }
            ]
        },
        {
            id: 3,
            title: 'Заголовок',
            slug: 'advanced-sql',
            description: 'Сложные запросы и оптимизация',
            children: [
                { id: 31, title: 'Подзапросы', slug: 'subqueries', children: [] },
                { id: 32, title: 'Оптимизация запросов', slug: 'query-optimization', children: [] }
            ]
        }
    ], []);

    const toggleSection = useCallback((slug) => {
        dispatch({ type: 'TOGGLE', slug });
    }, [dispatch]);

    return (
        <nav className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Руководства</h2>
            {guides.map(section => (
                <SectionItem
                    key={section.id}
                    section={section}
                    changeSection={changeSection}
                    activeSection={activeSection}
                    openSections={openSections}
                    toggleSection={toggleSection}
                />
            ))}
        </nav>
    );
};

export default Sidebar;
