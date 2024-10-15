import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { fetchItems } from './api';
import { search as searchDocuments } from './search';


const HomePage = lazy(() => import('./components/HomePage'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ConsultationPage = lazy(() => import('./components/ConsultationPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const EventsPage = lazy(() => import('./components/EventsPage'));
const FAQPage = lazy(() => import('./components/FAQPage'));
const ForumPage = lazy(() => import('./components/ForumPage'));
const ReviewsPage = lazy(() => import('./components/ReviewsPage'));

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

const SearchResults = React.memo(({ debouncedQuery, loading, filteredPages, onResultClick }) => {
    if (loading) return <div>Загрузка данных...</div>;
    if (debouncedQuery && filteredPages.length === 0) return <div className="no-results">Ничего не найдено</div>;

    return debouncedQuery ? (
        <div aria-live="polite" className={`search-results ${filteredPages.length > 0 ? 'visible' : 'hidden'}`}>
            <h2>Результаты поиска:</h2>
            <ul>
                {filteredPages.map(page => (
                    <li key={page.path}>
                        <Link to={page.path} onClick={onResultClick}>{page.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    ) : null;
});

const LoadingIndicator = () => (
    <div className="loading-indicator">
        <div className="spinner"></div>
        <p>Загрузка...</p>
    </div>
);

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const debouncedQuery = useDebounce(searchQuery, 300);

    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            setLoading(true);
            try {
                const data = await fetchItems();
                if (isMounted) setItems(data);
            } catch (err) {
                console.error('Ошибка при получении данных:', err);
                if (isMounted) setError('Ошибка при получении данных');
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        getData();
        return () => {
            isMounted = false;
        };
    }, []);

    const filteredPages = searchDocuments(debouncedQuery, items);
    
    // Функция для обработки клика по результату поиска
    const handleResultClick = () => {
        setSearchQuery(''); // Очищаем строку поиска
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

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

                <div className="search-results-container">
                    {error && <div className="error-message">{error}</div>}
                    <SearchResults 
                        debouncedQuery={debouncedQuery} 
                        loading={loading} 
                        filteredPages={filteredPages} 
                        onResultClick={handleResultClick} // Передаем функцию
                    />
                </div>

                <Suspense fallback={<LoadingIndicator />}>
                    <Routes>
                        {pages.map(({ path, component: Component }) => (
                            <Route key={path} path={path} element={<Component />} />
                        ))}
                        <Route path="*" element={<div>Ничего не найдено</div>} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
