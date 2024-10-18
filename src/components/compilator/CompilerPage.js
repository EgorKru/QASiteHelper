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
    Collapse,
} from '@mui/material';
import { Subject, Build, Code, ExpandMore, ExpandLess } from '@mui/icons-material';
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
            padding: '15px',
            borderRadius: '8px',
            transition: 'background-color 0.3s, transform 0.3s',
            '&:hover': {
                backgroundColor: '#3f51b5', // Цвет при наведении
                color: '#fff', // Цвет текста при наведении
                transform: 'scale(1.02)',
            },
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
        }}
    >
        <ListItemIcon sx={{ minWidth: '40px' }}>
            {topic.icon}
        </ListItemIcon>
        <ListItemText
            primary={topic.name}
            secondary={topic.description}
            primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            secondaryTypographyProps={{ style: { fontStyle: 'italic', color: '#ffffff', fontSize: '0.9rem' } }}
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
    const [open, setOpen] = useState(false); // Состояние для управления раскрытием

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
                    padding: '20px',
                    borderRadius: '12px',
                    backgroundColor: '#222',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', // Тень для блока
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)', // Увеличенная тень при наведении
                    },
                }}
            >
                <Typography variant="h5" mb={2}>
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

    // Функция для управления раскрытием описания
    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    return (
        <div className={`compiler-page ${fade ? 'fade-in' : ''}`}>
            <Container maxWidth="lg" sx={{ height: '100%' }}>
                <Box className="description" mb={3}>
                    <Typography 
                        variant="h4" 
                        gutterBottom 
                        onClick={handleToggle} // Добавляем обработчик клика
                        sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} // Указатель для курсора
                    >
                        Описание модуля 
                        {open ? <ExpandLess /> : <ExpandMore />} {/* Иконка для раскрытия */}
                    </Typography>
                    <Collapse in={open}>
                        <Typography variant="body1" paragraph className="pixel-description">
                            Добро пожаловать в мир Java!
                            В этом модуле вы погрузитесь в основы языка программирования Java, который является одним из самых популярных и востребованных языков в мире разработки.
                            <br /><br />
                            Мы начнем с изучения основ синтаксиса, где вы познакомитесь с переменными, операторами и ключевыми концепциями программирования. Вы узнаете, как правильно использовать различные типы данных и управлять ими.
                            <br /><br />
                            Далее мы откроем дверь в объектно-ориентированное программирование (ООП), где вы научитесь создавать классы и объекты, используя наследование и полиморфизм для более эффективного кода.
                            <br /><br />
                            Каждый раздел включает увлекательные интерактивные задания, которые помогут вам закрепить знания на практике. Приготовьтесь к множеству интересных вызовов и задач, которые сделают ваше обучение увлекательным и продуктивным!
                            <br /><br />
                            Вперёд, к новым знаниям и навыкам в Java! 
                        </Typography>
                    </Collapse>
                </Box>
                <Box className="modules-container">
                    <Typography variant="h4" gutterBottom>
                        Темы
                    </Typography>
                    {renderedModules}
                </Box>
            </Container>
        </div>
    );
};

export default CompilerPage;
