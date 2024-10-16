import React from 'react';

const trainersData = [
    {
        id: 'lc-trainer-1',
        title: 'Основы Java',
        description: 'Изучите основы Java с помощью интерактивных задач.',
        link: '/livecoding/java-basics',
    }
];

const LiveCodingTrainersPage = () => {
    return (
        <div className="live-coding-trainers-page">
            <h1></h1>
            <p></p>
            <section className="blocks-container">
                {trainersData.map((trainer) => (
                    <div
                        className="block"
                        key={trainer.id}
                        onClick={() => window.location.href = trainer.link}
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
