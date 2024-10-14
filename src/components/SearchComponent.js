// src/components/SearchComponent.js

import React, { useEffect, useState } from 'react';
import { fetchSearchResults } from '../api'; // Импортируем функцию

function SearchComponent() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getResults = async () => {
            setLoading(true); // Устанавливаем состояние загрузки
            try {
                const data = await fetchSearchResults(); // Получаем данные
                setResults(data); // Устанавливаем результаты
            } catch (err) {
                setError(err); // Устанавливаем ошибку в состоянии
            } finally {
                setLoading(false); // Завершаем загрузку
            }
        };

        getResults();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error.message}</div>;

    return (
        <div>
            <h2>Результаты поиска</h2>
            <ul>
                {results.map(result => (
                    <li key={result.id}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchComponent;
