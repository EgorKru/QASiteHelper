import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { search as searchDocuments } from './search'; // Импортируем функцию поиска

// Динамическая загрузка компонентов
const HomePage = lazy(() => import('./components/HomePage'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ConsultationPage = lazy(() => import('./components/ConsultationPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const EventsPage = lazy(() => import('./components/EventsPage'));
const FAQPage = lazy(() => import('./components/FAQPage'));
const ForumPage = lazy(() => import('./components/ForumPage'));
const ReviewsPage = lazy(() => import('./components/ReviewsPage'));

// Функция для дебаунса
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedQuery = useDebounce(searchQuery, 300);

    const pages = [
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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        console.log("Search query:", event.target.value);
    };

    // Фильтрация страниц
    const filteredPages = searchDocuments(debouncedQuery); // Используем функцию поиска

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Link to="/" className="header-title">QA Helper Platform</Link>
                    <div className="nav-bar">
                        <input
                            type="search"
                            placeholder="Поиск..."
                            className="search-bar"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <nav>
                            <Link to="/login" className="auth-button">Вход</Link>
                        </nav>
                    </div>
                </header>

                <div className="search-results">
                    {debouncedQuery && filteredPages.length === 0 && (
                        <div>Ничего не найдено</div>
                    )}
                    {debouncedQuery && filteredPages.length > 0 && (
                        <div>
                            <h2>Результаты поиска:</h2>
                            <ul>
                                {filteredPages.map((page, index) => (
                                    <li key={index}>
                                        <Link to={page.path}>{page.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <Suspense fallback={<div>Загрузка...</div>}>
                    <Routes>
                        {pages.map(page => (
                            <Route key={page.path} path={page.path} element={page.component} />
                        ))}
                        <Route path="*" element={<div>Ничего не найдено</div>} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
