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
                    {filteredPages.map((page) => (
                        <li key={page.id}>
                            <Link to={page.link} onClick={onResultClick}>
                                {page.title}
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
