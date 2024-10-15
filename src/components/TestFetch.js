// src/TestFetch.js

import React, { useEffect, useState } from 'react';
import { fetchItems } from './api';

const TestFetch = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const testFetch = async () => {
            try {
                const data = await fetchItems();
                setItems(data);
            } catch (err) {
                setError('Ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };
        testFetch();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Полученные элементы:</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TestFetch;
