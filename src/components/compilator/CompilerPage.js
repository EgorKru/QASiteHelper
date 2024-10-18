import React, { useEffect, useState, useMemo, useCallback } from 'react';
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
import { Subject, Build, Code } from '@mui/icons-material';
import PropTypes from 'prop-types';
import './CompilerPage.css';

// Объект для хранения иконок
const ICONS = {
    subject: <Subject fontSize="large" />,
    build: <Build fontSize="large" />,
    code: <Code fontSize="large" />,
};

// Модули и темы
const MODULES = [
    {
        title: "Введение в Java",
        topics: [
            { name: "История Java", description: "Узнайте о происхождении языка и его развитии.", icon: ICONS.subject },
            { name: "Установка и настройка среды", description: "Пошаговое руководство по установке JDK и IDE.", icon: ICONS.build },
            { name: "Первый проект: 'Hello, World!'", description: "Создайте и запустите свой первый проект.", icon: ICONS.code },
        ],
    },
    {
        title: "Основы синтаксиса",
        topics: [
            { name: "Переменные и типы данных", description: "Изучите основные типы данных и как их использовать.", icon: ICONS.subject },
            { name: "Условные операторы", description: "Понимание if, else if и switch.", icon: ICONS.code },
            { name: "Циклы", description: "Использование for и while для итерации по данным.", icon: ICONS.code },
        ],
    },
    {
        title: "Объектно-ориентированное программирование (ООП)",
        topics: [
            { name: "Классы и объекты", description: "Создание и использование классов.", icon: ICONS.subject },
            { name: "Наследование", description: "Понимание концепции наследования в Java.", icon: ICONS.subject },
            { name: "Полиморфизм", description: "Использование полиморфизма для повышения гибкости кода.", icon: ICONS.code },
            { name: "Инкапсуляция", description: "Принципы инкапсуляции и скрытия данных.", icon: ICONS.code },
        ],
    },
    {
        title: "Дополнительные темы",
        topics: [
            { name: "Работа с коллекциями", description: "Изучите ArrayList, HashMap и другие структуры данных.", icon: ICONS.subject },
            { name: "Исключения", description: "Как обрабатывать ошибки в Java.", icon: ICONS.code },
            { name: "Ввод/вывод", description: "Чтение и запись файлов.", icon: ICONS.code },
            { name: "Основы многопоточности", description: "Понимание потоков и синхронизации.", icon: ICONS.code },
        ],
    },
];

// Компонент для рендеринга тем
const TopicItem = React.memo(({ topic, onClick }) => (
    <ListItem
        button
        onClick={onClick}
        className="module-item fade-in-item"
        aria-label={`Перейти к теме ${topic.name}`}
        role="button"
        tabIndex={0}
        sx={{
            padding: '20px',
            fontSize: '1.2rem',
            transition: 'all 0.3s',
            '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                zIndex: 1,
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            },
            marginBottom: '10px',
            borderRadius: '8px',
        }}
    >
        <ListItemIcon sx={{ minWidth: '40px' }}>
            {topic.icon}
        </ListItemIcon>
        <ListItemText
            primary={topic.name}
            secondary={topic.description}
            className="neon-text"
            primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.2rem' }}
            secondaryTypographyProps={{ style: { fontStyle: 'italic', color: '#ffffff', fontSize: '1rem' } }}
        />
    </ListItem>
));

TopicItem.propTypes = {
    topic: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.node.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const CompilerPage = () => {
    const navigate = useNavigate();
    const [fade, setFade] = useState(false);

    useEffect(() => {
        setFade(true);
    }, []);

    const formatModuleName = useCallback((topicName) =>
        topicName.replace(/\s+/g, '-').toLowerCase(), []
    );

    const handleModuleClick = useCallback((topicName) => {
        const formattedModuleName = formatModuleName(topicName);
        navigate(`/modules/${formattedModuleName}`);
    }, [formatModuleName, navigate]);

    const renderedModules = useMemo(() => (
        MODULES.map((module, index) => (
            <Box
                key={index}
                mb={4}
                className="module-block"
                sx={{
                    padding: '15px',
                    borderRadius: '12px',
                    backgroundColor: '#222',
                    transition: 'all 0.3s',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                    },
                }}
            >
                <Typography variant="h5" className="module-title neon-text" mb={2}>
                    {module.title}
                </Typography>
                <List className="modules-list" sx={{ padding: 0 }}>
                    {module.topics.map((topic, topicIndex) => (
                        <TopicItem
                            key={topicIndex}
                            topic={topic}
                            onClick={() => handleModuleClick(topic.name)}
                        />
                    ))}
                </List>
            </Box>
        ))
    ), [handleModuleClick]);

    return (
        <div className={`compiler-page ${fade ? 'fade-in' : ''}`} style={{ height: '100vh', overflowY: 'auto' }}>
            <Container maxWidth="lg" sx={{ height: '100%' }}>
                <Box className="description" mb={3}>
                    <Typography variant="h4" gutterBottom className="neon-text pixel-text">
                        Описание модуля
                    </Typography>
                    <Typography variant="body1" paragraph className="neon-text pixel-description">
                        В этом модуле вы изучите основы Java, включая синтаксис, переменные, операторы и основы объектно-ориентированного программирования. Каждый раздел содержит интерактивные задания для закрепления знаний.
                    </Typography>
                </Box>
                <Box className="modules-container" sx={{ padding: 0 }}>
                    <Typography variant="h4" gutterBottom className="neon-text pixel-text">
                        Темы
                    </Typography>
                    {renderedModules}
                </Box>
                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    className="back-button neon-text"
                >
                    Назад
                </Button>
            </Container>
        </div>
    );
};

export default CompilerPage;
