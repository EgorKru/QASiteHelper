// src/App.js

import React, { useState, useEffect, lazy, Suspense } from 'react'; 
// Импортируем необходимые функции и компоненты из библиотеки React. 
// useState - для управления состоянием, useEffect - для побочных эффектов, 
// lazy - для динамической загрузки компонентов, Suspense - для обработки загрузки.

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
// Импортируем необходимые компоненты для маршрутизации из библиотеки react-router-dom.

import './App.css'; 
// Импортируем стили для приложения из файла App.css.

import { fetchItems } from './api'; // Импортируем функцию fetchItems для получения данных из API.
import { search as searchDocuments } from './search'; // Импортируем функцию search для поиска документов.

// Динамическая загрузка компонентов
const HomePage = lazy(() => import('./components/HomePage')); 
// Загружаем компонент HomePage только по необходимости.
const LoginPage = lazy(() => import('./components/LoginPage')); 
// Загружаем компонент LoginPage только по необходимости.
const AboutPage = lazy(() => import('./components/AboutPage')); 
// Загружаем компонент AboutPage только по необходимости.
const ConsultationPage = lazy(() => import('./components/ConsultationPage')); 
// Загружаем компонент ConsultationPage только по необходимости.
const ContactPage = lazy(() => import('./components/ContactPage')); 
// Загружаем компонент ContactPage только по необходимости.
const EventsPage = lazy(() => import('./components/EventsPage')); 
// Загружаем компонент EventsPage только по необходимости.
const FAQPage = lazy(() => import('./components/FAQPage')); 
// Загружаем компонент FAQPage только по необходимости.
const ForumPage = lazy(() => import('./components/ForumPage')); 
// Загружаем компонент ForumPage только по необходимости.
const ReviewsPage = lazy(() => import('./components/ReviewsPage')); 
// Загружаем компонент ReviewsPage только по необходимости.

// Функция для дебаунса
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value); 
    // Создаем состояние для хранения дебаунсированного значения.

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value); 
            // Обновляем дебаунсированное значение после задержки.
        }, delay);
        
        return () => {
            clearTimeout(handler); 
            // Очищаем таймер при размонтировании или изменении значения.
        };
    }, [value, delay]); 
    // Зависимости: вызываем эффект при изменении value или delay.

    return debouncedValue; 
    // Возвращаем дебаунсированное значение.
};

function App() {
    const [searchQuery, setSearchQuery] = useState(''); 
    // Создаем состояние для хранения текстового запроса поиска.

    const [items, setItems] = useState([]); 
    // Создаем состояние для хранения данных, полученных из API.

    const debouncedQuery = useDebounce(searchQuery, 300); 
    // Применяем дебаунс к запросу поиска с задержкой 300 мс.

    useEffect(() => {
        const getData = async () => {
            const data = await fetchItems(); 
            // Получаем данные из API.
            setItems(data); 
            // Обновляем состояние items полученными данными.
        };

        getData(); 
        // Вызываем асинхронную функцию для получения данных.
    }, []); 
    // Пустой массив зависимостей означает, что эффект выполнится только один раз после монтирования компонента.

    const filteredPages = searchDocuments(debouncedQuery, items); 
    // Фильтруем страницы на основе дебаунсированного запроса и полученных данных.

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); 
        // Обновляем состояние searchQuery при изменении текстового поля поиска.
    };

    const pages = [ 
        // Определяем маршруты для страниц приложения.
        { path: "/", name: "Главная", component: <HomePage /> },
        { path: "/login", name: "Вход", component: <LoginPage /> },
        { path: "/about", name: "О нас", component: <AboutPage /> },
        { path: "/consultation", name: "Консультации", component: <ConsultationPage /> },
        { path: "/contacts", name: "Контакты", component: <ContactPage /> },
        { path: "/events", name: "События", component: <EventsPage /> },
        { path: "/faq", name: "Часто задаваемые вопросы", component: <FAQPage /> },
        { path: "/forum", name: "Форум", component: <ForumPage /> },
        { path: "/reviews", name: "Отзывы", component: <ReviewsPage /> },
    ];

    return (
        <Router>
            {/* Оборачиваем приложение в Router для маршрутизации */}
            <div className="App">
                <header className="App-header">
                    {/* Заголовок приложения */}
                    <Link to="/" className="header-title">QA Helper Platform</Link>
                    {/* Ссылка на главную страницу */}
                    <div className="nav-bar">
                        <input
                            type="search"
                            placeholder="Поиск..."
                            className="search-bar"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        {/* Поле ввода для поиска с обработчиком изменения */}
                        <nav>
                            <Link to="/login" className="auth-button">Вход</Link>
                            {/* Ссылка на страницу входа */}
                        </nav>
                    </div>
                </header>

                <div className="search-results">
                    {debouncedQuery && filteredPages.length === 0 && (
                        <div>Ничего не найдено</div>
                    )}
                    {/* Если есть запрос, но ничего не найдено, показываем сообщение */}

                    {debouncedQuery && filteredPages.length > 0 && (
                        <div>
                            <h2>Результаты поиска:</h2>
                            <ul>
                                {filteredPages.map((page, index) => (
                                    <li key={index}>
                                        <Link to={page.path}>{page.name}</Link>
                                        {/* Отображаем найденные страницы в виде ссылок */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <Suspense fallback={<div>Загрузка...</div>}>
                    {/* Отображаем индикатор загрузки при динамической загрузке компонентов */}
                    <Routes>
                        {pages.map(page => (
                            <Route key={page.path} path={page.path} element={page.component} />
                            // Определяем маршруты для всех страниц
                        ))}
                        <Route path="*" element={<div>Ничего не найдено</div>} />
                        {/* Обработка маршрутов, не найденных на сервере */}
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App; 
// Экспортируем компонент App как модуль для использования в других частях приложения.
