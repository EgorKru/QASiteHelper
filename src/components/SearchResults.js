import React from 'react'; 
import { Link } from 'react-router-dom'; 

const SearchResults = ({ debouncedQuery, loading, filteredPages, onResultClick }) => {
    if (loading) return <div>Загрузка данных...</div>;

    if (debouncedQuery) {
        if (filteredPages.length === 0) return <div>Ничего не найдено</div>;

        return (
            <div>
                <h2>Результаты поиска:</h2>
                <ul>
                    {filteredPages.map((page, index) => (
                        <li key={index}>
                            <Link 
                                to={page.path}
                                onClick={() => onResultClick()} // Вызываем функцию при клике
                            >
                                {page.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return null;
};

export default SearchResults;
