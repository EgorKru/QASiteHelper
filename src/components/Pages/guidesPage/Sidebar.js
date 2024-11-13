// Sidebar.js
import React, { useState, memo, useMemo } from 'react';
import classNames from 'classnames';
import styles from './Sidebar.module.css';

const Sidebar = ({ changeSection, activeSection }) => {
    const [openSections, setOpenSections] = useState({});

    const guides = useMemo(() => [
        // Весь контент, описанный выше
    ], []);

    const toggleSection = (slug) => {
        setOpenSections(prev => ({ ...prev, [slug]: !prev[slug] }));
    };

    const SectionItem = memo(({ section }) => (
        <div className={styles.sectionItem}>
            <div
                onClick={() => {
                    changeSection(section.slug);
                    if (section.children.length > 0) toggleSection(section.slug);
                }}
                className={classNames(styles.sectionTitle, {
                    [styles.sectionTitleActive]: activeSection === section.slug,
                })}
            >
                <span
                    className={classNames(styles.bullet, {
                        [styles.bulletActive]: activeSection === section.slug,
                    })}
                ></span>
                {section.title}
            </div>
            {section.description && <p className={styles.description}>{section.description}</p>}
            {section.children.length > 0 && openSections[section.slug] && (
                <div className={styles.childContainer}>{renderTree(section.children)}</div>
            )}
        </div>
    ));

    const renderTree = (sections) => sections.map((section) => (
        <SectionItem key={section.id} section={section} />
    ));

    return (
        <nav className={styles.sidebar}>
            <h2>Руководства</h2>
            {renderTree(guides)}
        </nav>
    );
};

export default Sidebar;
