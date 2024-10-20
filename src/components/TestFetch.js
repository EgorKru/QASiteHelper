import React, { useEffect, useState } from 'react';
import { fetchItems } from './api'; // Убедитесь, что путь правильный

const TestFetch = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const testFetch = async () => {
            setLoading(true);
            try {
                const data = await fetchItems(); // Запрашиваем данные с /items
                console.log('Загруженные данные:', data); // Отладочный вывод
                setItems(data); // Устанавливаем загруженные данные
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
            {items.length === 0 ? (
                <p>Нет доступных элементов</p>
            ) : (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <i className={item.icon}></i> {/* Иконка */}
                            <a href={item.link}>Перейти</a> {/* Ссылка */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TestFetch;
