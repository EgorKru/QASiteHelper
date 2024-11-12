import React, { useState, useCallback, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { search } from './search';
import { useFetchItems } from './hooks/useFetchItems'; // Хук для получения данных
import { useDebounce } from './hooks/useDebounce'; // Хук для debounce
import SearchBar from './components/SearchBar'; // Вынесенный компонент для поиска
import SearchResults from './components/SearchResults';
import { routes } from './routes'; // Массив с конфигурацией маршрутов

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const { items, loading, error } = useFetchItems();
    const debouncedQuery = useDebounce(searchQuery, 300);
    const filteredPages = search(debouncedQuery, items);

    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    const handleResultClick = useCallback(() => {
        setSearchQuery('');
    }, []);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Link to="/" className="header-title">QA Helper Platform</Link>
                    <div className="nav-bar">
                        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
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
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
