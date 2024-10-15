import React, { useEffect, useState } from 'react';
import { fetchSearchResults } from '../api';
import SearchResults from './SearchResults'; // Импортируем компонент для результатов поиска

function SearchComponent() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Состояние для строки поиска

    useEffect(() => {
        const getResults = async () => {
            setLoading(true);
            try {
                const data = await fetchSearchResults();
                setResults(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getResults();
    }, []);

    const handleResultClick = () => {
        setSearchTerm(''); // Очищаем строку поиска
    };

    // Если данные загружаются
    if (loading) return <div>Загрузка...</div>;
    // Если произошла ошибка
    if (error) return <div>Ошибка: {error.message}</div>;

    return (
        <div>
            <h2>Поиск</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Устанавливаем значение из поля ввода
            />
            <SearchResults
                debouncedQuery={searchTerm}
                loading={loading}
                filteredPages={results.filter(result => result.name.includes(searchTerm))} // Фильтрация результатов
                onResultClick={handleResultClick} // Передаем функцию для обработки клика
            />
        </div>
    );
}

export default SearchComponent;
