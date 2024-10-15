import React from 'react'; 
import { Link } from 'react-router-dom'; //Link для навигации

// Компонент для отображения результатов поиска
const SearchResults = ({ debouncedQuery, loading, filteredPages, onResultClick }) => {
    // Если данные загружаются, показываем индикатор загрузки
    if (loading) return <div>Загрузка данных...</div>;

    // Если есть запрос для поиска
    if (debouncedQuery) {
        // Если не найдено ни одной страницы, показываем соответствующее сообщение
        if (filteredPages.length === 0) return <div>Ничего не найдено</div>;

        return (
            <div>
                <h2>Результаты поиска:</h2>
                <ul>
                    {/* Проходимся по всем отфильтрованным страницам и отображаем их */}
                    {filteredPages.map((page, index) => (
                        <li key={index}>
                            <Link 
                                to={page.path} // Путь для навигации
                                onClick={() => onResultClick()} // Скрытие результатов при клике
                            >
                                {page.name} // Название страницы
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    // Если нет запроса, ничего не отображаем
    return null;
};

// Экспортируем компонент для использования в других частях приложения
export default SearchResults;
