// components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => (
    <input
        type="search"
        placeholder="Поиск..."
        className="search-bar"
        value={searchQuery}
        onChange={onSearchChange}
        aria-label="Поле поиска"
    />
);

export default SearchBar;
