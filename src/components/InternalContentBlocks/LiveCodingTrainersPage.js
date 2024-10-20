import React from 'react';
import { useNavigate } from 'react-router-dom';

const trainersData = [
    {
        id: 'lc-trainer-1',
        title: 'Основы Java',
        description: 'Изучите основы Java с помощью интерактивных задач.',
        link: '/compiler', // Изменить ссылку на компилятор
    }
];

const LiveCodingTrainersPage = () => {
    const navigate = useNavigate(); // Хук для навигации

    return (
        <div className="live-coding-trainers-page">
            <h1> </h1>
            <p> </p>
            <section className="blocks-container">
                {trainersData.map((trainer) => (
                    <div
                        className="block"
                        key={trainer.id}
                        onClick={() => navigate(trainer.link)} // Используем navigate для перехода
                    >
                        <h2>{trainer.title}</h2>
                        <p>{trainer.description}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default LiveCodingTrainersPage;
