// src/components/SearchComponent.js

import React, { useEffect, useState } from 'react'; // Импорт React и хуков
import { fetchSearchResults } from '../api'; // Импортируем функцию для получения результатов поиска

// Для отображения результатов поиска
function SearchComponent() {
    const [results, setResults] = useState([]); // Состояние для хранения результатов
    const [loading, setLoading] = useState(true); // Состояние для индикатора загрузки
    const [error, setError] = useState(null); // Состояние для хранения ошибок

    useEffect(() => {
        // Асинхронная функция для получения результатов
        const getResults = async () => {
            setLoading(true); // Установка состояние загрузки
            try {
                const data = await fetchSearchResults(); // Получение данныхъ с API
                setResults(data); // Устанока результатов в состояние
            } catch (err) {
                setError(err); // Устанавливаем ошибку в состояние при возникновении
            } finally {
                setLoading(false); // Завершение загрузку, независимо от результата
            }
        };

        getResults(); // Вызов функции для получения результатов
    }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании

    // Если данные загружаются, показываем индикатор загрузки
    if (loading) return <div>Загрузка...</div>;
    // Если произошла ошибка, показываем сообщение об ошибке
    if (error) return <div>Ошибка: {error.message}</div>;

    return (
        <div>
            <h2>Результаты поиска</h2>
            <ul>
                {/* Отображаем список результатов */}
                {results.map(result => (
                    <li key={result.id}>{result.name}</li> // Каждому элементу списка присваиваем уникальный ключ
                ))}
            </ul>
        </div>
    );
}

// Экспортируем компонент для использования в других частях приложения
export default SearchComponent;
