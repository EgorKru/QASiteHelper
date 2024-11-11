import React, { useEffect, useState } from 'react';
import { fetchItems } from '../api';
import SearchResults from './SearchResults';

function SearchComponent() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getResults = async () => {
      setLoading(true);
      try {
        const data = await fetchItems(); // Предполагаем, что fetchItems уже возвращает распарсенные данные
        setResults(data.items);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err.message); // Более подробная ошибка
        setError('Ошибка при загрузке данных. Пожалуйста, попробуйте снова.');
      } finally {
        setLoading(false);
      }
    };

    getResults();
  }, []);

  const handleSearch = () => {
    const filteredResults = search(searchTerm, results); // Не хватает функции search, ее нужно реализовать
    setResults(filteredResults);
  };

  const handleResultClick = (page) => {
    setSearchTerm('');
    // Здесь можно добавить дополнительные действия при клике на ссылку
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
      <div>
        <h2>Поиск</h2>
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Поиск</button>
        <SearchResults
            debouncedQuery={searchTerm}
            loading={loading}
            filteredPages={results}
            onResultClick={handleResultClick}
        />
      </div>
  );
}

export default SearchComponent;
