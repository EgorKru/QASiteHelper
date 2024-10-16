import React, { useEffect, useState } from 'react';
import { fetchItems } from '../../api'; // Импортируем функцию для получения данных
import './TrainersPage.css'; // Импортируйте стили, если они нужны

const TrainersPage = () => {
    const [loading, setLoading] = useState(true); // Состояние для индикатора загрузки
    const [error, setError] = useState(null); // Состояние для обработки ошибок

    useEffect(() => {
        const getTrainers = async () => {
            setLoading(true);
            try {
                await fetchItems(); // Запрос данных тренажеров, но ничего не сохраняем
            } catch (err) {
                setError('Ошибка при загрузке данных тренажеров');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getTrainers();
    }, []);

    if (loading) return <div>Загрузка тренажеров...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="trainers-page">
            <h1>Тренажеры</h1>
            <p>Здесь вы можете найти информацию о различных тренажерах.</p>
        </div>
    );
};

export default TrainersPage;
