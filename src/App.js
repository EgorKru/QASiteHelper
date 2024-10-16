import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { fetchItems } from './api';
import { search as searchDocuments } from './search';
import * as Components from './components';

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
                    <li key={page.id}>
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
        const controller = new AbortController();
        const getData = async () => {
            setLoading(true);
            try {
                const data = await fetchItems({ signal: controller.signal });
                setItems(data);
                console.log("Fetched items:", data);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Ошибка при получении данных:', err);
                    setError({ message: 'Ошибка при получении данных', details: err });
                }
            } finally {
                setLoading(false);
            }
        };
        getData();
        return () => {
            controller.abort();
        };
    }, []);

    const filteredPages = searchDocuments(debouncedQuery, items);

    const handleResultClick = useCallback(() => {
        setSearchQuery('');
    }, []);

    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    const pages = [
        { path: "/", name: "Главная", component: Components.HomePage },
        { path: "/login", name: "Вход", component: Components.LoginPage },
        { path: "/about", name: "О нас", component: Components.AboutPage },
        { path: "/consultation", name: "Консультации", component: Components.ConsultationPage },
        { path: "/contacts", name: "Контакты", component: Components.ContactPage },
        { path: "/events", name: "События", component: Components.EventsPage },
        { path: "/faq", name: "Часто задаваемые вопросы", component: Components.FAQPage },
        { path: "/forum", name: "Форум", component: Components.ForumPage },
        { path: "/reviews", name: "Отзывы", component: Components.ReviewsPage },
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
                    {error && <div className="error-message">{error.message}</div>}
                    <SearchResults 
                        debouncedQuery={debouncedQuery} 
                        loading={loading} 
                        filteredPages={filteredPages} 
                        onResultClick={handleResultClick} 
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