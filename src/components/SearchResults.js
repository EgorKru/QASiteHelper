import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SearchResults.module.css'; // Убедитесь, что путь правильный

const SearchResults = ({ debouncedQuery, loading, filteredPages, onResultClick }) => {
    if (loading) return <div className={styles.loadingIndicator}>Загрузка данных...</div>;

    if (debouncedQuery) {
        if (filteredPages.length === 0) return <div className={styles.noResults}>Ничего не найдено</div>;

        return (
            <div className={styles.resultsContainer}>
                <ul className={styles.resultsList}>
                    {filteredPages.map((page) => (
                        <li key={page.id} className={styles.resultItem}>
                            <Link 
                                to={page.link} 
                                onClick={onResultClick} 
                                className={styles.resultLink}
                            >
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
