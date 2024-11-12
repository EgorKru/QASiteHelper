// hooks/useFetchItems.js
import { useState, useEffect } from 'react';
import { fetchItems } from '../api';

export const useFetchItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const getData = async () => {
            setLoading(true);
            try {
                const data = await fetchItems({ signal: controller.signal });
                setItems(data);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Ошибка при получении данных:', err);
                    setError({ message: 'Ошибка при получении данных', details: err });
                }
            } finally {
                setLoading(false);
            }
        };
        getData();
        return () => {
            controller.abort();
        };
    }, []);

    return { items, loading, error };
};
