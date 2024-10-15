import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { fetchItems } from './api'; //Функция fetchItems из api.js
import { search as searchDocuments } from './search'; //Функция search из search.js

// Оптимизация загрузки страниц
const HomePage = lazy(() => import('./components/HomePage'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ConsultationPage = lazy(() => import('./components/ConsultationPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const EventsPage = lazy(() => import('./components/EventsPage'));
const FAQPage = lazy(() => import('./components/FAQPage'));
const ForumPage = lazy(() => import('./components/ForumPage'));
const ReviewsPage = lazy(() => import('./components/ReviewsPage'));

// Хук для задержки ввода в поле поиска
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

// Компонент для отображения результатов поиска
const SearchResults = React.memo(({ debouncedQuery, loading, filteredPages }) => {
    // Отображаем сообщение о загрузке данных, если происходит загрузка
    if (loading) return <div>Загрузка данных...</div>;
    // Отображаем сообщение о том, что ничего не найдено при наличии запроса и пустом результате
    if (debouncedQuery && filteredPages.length === 0) return <div>Ничего не найдено</div>;

    // Отображаем результаты поиска, если запрос выполнен и есть соответствующие страницы
    return debouncedQuery ? (
        <div aria-live="polite">
            <h2>Результаты поиска:</h2>
            <ul>
                {filteredPages.map(page => (
                    <li key={page.path}>
                        <Link to={page.path}>{page.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    ) : null;
});

// Основной компонент приложения
function App() {
    const [searchQuery, setSearchQuery] = useState(''); // Состояние для поискового запроса
    const [items, setItems] = useState([]); // Состояние для списка элементов
    const [loading, setLoading] = useState(true); // Состояние для индикатора загрузки
    const [error, setError] = useState(null); // Состояние для ошибки
    const debouncedQuery = useDebounce(searchQuery, 300); // Хук задержки для поискового запроса

    // Эффект для получения данных при монтировании компонента
    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            setLoading(true); // Устанавливаем состояние загрузки
            try {
                const data = await fetchItems(); // Получаем данные с сервера
                if (isMounted) setItems(data); // Обновляем состояние с данными
            } catch (err) {
                console.error('Ошибка при получении данных:', err); // Логируем ошибку
                if (isMounted) setError('Ошибка при получении данных'); // Устанавливаем ошибку
            } finally {
                if (isMounted) setLoading(false); // Снимаем состояние загрузки
            }
        };
        getData(); // Вызываем функцию получения данных
        return () => {
            isMounted = false; // Очищаем флаг isMounted при размонтировании компонента
        };
    }, []); // Пустой массив зависимостей для выполнения эффекта один раз

    // Фильтрация страниц по поисковому запросу
    const filteredPages = searchDocuments(debouncedQuery, items);

    // Обработка изменения поискового запроса
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Обнова состояния запроса в поиск
    };

    // Список маршрутов
    const pages = [
        { path: "/", name: "Главная", component: HomePage },
        { path: "/login", name: "Вход", component: LoginPage },
        { path: "/about", name: "О нас", component: AboutPage },
        { path: "/consultation", name: "Консультации", component: ConsultationPage },
        { path: "/contacts", name: "Контакты", component: ContactPage },
        { path: "/events", name: "События", component: EventsPage },
        { path: "/faq", name: "Часто задаваемые вопросы", component: FAQPage },
        { path: "/forum", name: "Форум", component: ForumPage },
        { path: "/reviews", name: "Отзывы", component: ReviewsPage },
    ];

    // Возвращаем JSX для отображения приложения
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
                            aria-label="Поле поиска"
                        />
                        <nav>
                            <Link to="/login" className="auth-button">Вход</Link>
                        </nav>
                    </div>
                </header>

                <div className="search-results">
                    {error && <div className="error-message">{error}</div>}
                    <SearchResults 
                        debouncedQuery={debouncedQuery} 
                        loading={loading} 
                        filteredPages={filteredPages} 
                    />
                </div>

                <Suspense fallback={<div>Загрузка...</div>}>
                    <Routes>
                        {/* Отображаем маршруты для каждой страницы */}
                        {pages.map(({ path, component: Component }) => (
                            <Route key={path} path={path} element={<Component />} />
                        ))}
                        {/* Ошибка, если маршрут не найден */}
                        <Route path="*" element={<div>Ничего не найдено</div>} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App; //экспорт апп для использования
