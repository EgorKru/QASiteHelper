import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { fetchItems } from './api';
import { search } from './search';
import SearchResults from './components/SearchResults'; // Добавьте этот импорт
import * as Components from './components';
import AboutPage from './components/AboutPage';

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

    const filteredPages = search(debouncedQuery, items);

    const handleResultClick = useCallback(() => {
        setSearchQuery('');
    }, []);

    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

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

                <Suspense fallback={<div>Загрузка...</div>}>
    <Routes>
        <Route path="/" element={<Components.HomePage />} />
        <Route path="/login" element={<Components.LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guides" element={<Components.GuidesPage />} />
        <Route path="/trainers" element={<Components.TrainersPage />} />
        <Route path="/tests" element={<Components.TestsPage />} />
        <Route path="/courses" element={<Components.CoursesPage />} />
        <Route path="/consultation" element={<Components.ConsultationPage />} />
        <Route path="/events" element={<Components.EventsPage />} />
        <Route path="/forum" element={<Components.ForumPage />} />
        <Route path="/reviews" element={<Components.ReviewsPage />} />
        <Route path="*" element={<div>Ничего не найдено</div>} />
    </Routes>
</Suspense>

            </div>
        </Router>
    );
}

export default App;
