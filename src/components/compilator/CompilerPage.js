import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
    Container,
    ListItemIcon,
    Button,
} from '@mui/material';
import SubjectIcon from '@mui/icons-material/Subject'; // Иконка для теоретических тем
import BuildIcon from '@mui/icons-material/Build'; // Иконка для практических тем
import CodeIcon from '@mui/icons-material/Code'; // Иконка для программирования
import './CompilerPage.css'; // Импортируем стили

const modules = [
    {
        title: "Введение в Java",
        topics: [
            { name: "История Java", description: "Узнайте о происхождении языка и его развитии.", icon: <SubjectIcon /> },
            { name: "Установка и настройка среды", description: "Пошаговое руководство по установке JDK и IDE.", icon: <BuildIcon /> },
            { name: "Первый проект: 'Hello, World!'", description: "Создайте и запустите свой первый проект.", icon: <CodeIcon /> },
        ],
    },
    {
        title: "Основы синтаксиса",
        topics: [
            { name: "Переменные и типы данных", description: "Изучите основные типы данных и как их использовать.", icon: <SubjectIcon /> },
            { name: "Условные операторы", description: "Понимание if, else if и switch.", icon: <CodeIcon /> },
            { name: "Циклы", description: "Использование for и while для итерации по данным.", icon: <CodeIcon /> },
        ],
    },
    {
        title: "Объектно-ориентированное программирование (ООП)",
        topics: [
            { name: "Классы и объекты", description: "Создание и использование классов.", icon: <SubjectIcon /> },
            { name: "Наследование", description: "Понимание концепции наследования в Java.", icon: <SubjectIcon /> },
            { name: "Полиморфизм", description: "Использование полиморфизма для повышения гибкости кода.", icon: <CodeIcon /> },
            { name: "Инкапсуляция", description: "Принципы инкапсуляции и скрытия данных.", icon: <CodeIcon /> },
        ],
    },
    {
        title: "Дополнительные темы",
        topics: [
            { name: "Работа с коллекциями", description: "Изучите ArrayList, HashMap и другие структуры данных.", icon: <SubjectIcon /> },
            { name: "Исключения", description: "Как обрабатывать ошибки в Java.", icon: <CodeIcon /> },
            { name: "Ввод/вывод", description: "Чтение и запись файлов.", icon: <CodeIcon /> },
            { name: "Основы многопоточности", description: "Понимание потоков и синхронизации.", icon: <CodeIcon /> },
        ],
    },
];

const CompilerPage = () => {
    const navigate = useNavigate();
    const [fade, setFade] = useState(false);

    useEffect(() => {
        setFade(true);
    }, []);

    const handleModuleClick = (topicName) => {
        const formattedModuleName = topicName.replace(/\s+/g, '-').toLowerCase();
        navigate(`/modules/${formattedModuleName}`);
    };

    return (
        <Container maxWidth="lg" className={`compiler-page ${fade ? 'fade-in' : ''}`}>
            <Box className="description" mb={3}>
                <Typography variant="h4" gutterBottom className="neon-text pixel-text">
                    Описание модуля
                </Typography>
                <Typography variant="body1" paragraph className="neon-text pixel-description">
                    В этом модуле вы изучите основы Java, включая синтаксис, переменные, операторы и основы объектно-ориентированного программирования. Каждый раздел содержит интерактивные задания для закрепления знаний.
                </Typography>
            </Box>
            <Box className="modules-container">
                <Typography variant="h4" gutterBottom className="neon-text pixel-text">
                    Темы
                </Typography>
                {modules.map((module, index) => (
                    <Box key={index} mb={3} className="module-block">
                        <Typography variant="h5" className="module-title neon-text">
                            {module.title}
                        </Typography>
                        <List className="modules-list">
                            {module.topics.map((topic, topicIndex) => (
                                <ListItem 
                                    button 
                                    key={topicIndex} 
                                    onClick={() => handleModuleClick(topic.name)} 
                                    className="module-item fade-in-item" 
                                    aria-label={`Перейти к теме ${topic.name}`}
                                >
                                    <ListItemIcon style={{ color: 'var(--main-color)', animation: 'pulse 1.5s infinite' }}>
                                        {topic.icon}
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={<span className="neon-icon">{topic.name}</span>}
                                        secondary={<span className="topic-description">{topic.description}</span>}
                                        primaryTypographyProps={{ fontWeight: 'bold' }}
                                        secondaryTypographyProps={{ style: { fontStyle: 'italic' }}}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                ))}
            </Box>
            <Button
                variant="outlined"
                onClick={() => navigate(-1)} // Навигация назад
                className="back-button neon-text"
            >
                Назад
            </Button>
        </Container>
    );
};

export default CompilerPage;
