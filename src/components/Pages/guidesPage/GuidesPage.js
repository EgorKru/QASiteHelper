import React, { useState } from 'react';
import Sidebar from './Sidebar';
import GuideContent from './GuideContent';

const GuidesPage = () => {
    const [activeSection, setActiveSection] = useState('intro-to-sql');
    const sections = ['introduction', 'sql-basics', 'advanced-sql']; // массив всех доступных разделов

    const handleChangeSection = (section) => {
        if (sections.includes(section)) { // проверка наличия секции в массиве
            setActiveSection(section);
        }
    };

    return(
        <div className="guides-container">
            <Sidebar changeSection={handleChangeSection} activeSection={activeSection} />
            <div className="guide-content-container">
                <GuideContent activeSection={activeSection} />
            </div>
        </div>
    );
};

export default GuidesPage;