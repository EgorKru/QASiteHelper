import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from './TaskContext';

const ModuleDetail = () => {
    const { selectedTask } = useTasks();
    const navigate = useNavigate();

    // Если задача не выбрана, выводим сообщение
    if (!selectedTask) {
        return <div>Выберите задачу из списка</div>;
    }

    // Темы модуля
    const topics = [
        { id: '1', title: 'Введение в Java' },
        { id: '2', title: 'Переменные и типы данных' },
        { id: '3', title: 'Условные операторы' },
        { id: '4', title: 'Циклы' },
        { id: '5', title: 'Методы и функции' },
        { id: '6', title: 'Объектно-ориентированное программирование' },
    ];

    // Обработчик клика по теме
    const handleTopicClick = (topicId) => {
        navigate(`/topic/${topicId}`);
    };

    return (
        <div className="module-detail">
            <h2>{selectedTask.title}</h2>
            <p>
                Этот модуль сделан для того, чтобы ознакомиться с основами Java и восполнить потенциальные пробелы.
                Также в этом модуле мы познакомимся с основными понятиями Java и объектно-ориентированного программирования.
            </p>
            <h3>Темы модуля:</h3>
            <ul>
                {topics.map(topic => (
                    <li 
                        key={topic.id} 
                        onClick={() => handleTopicClick(topic.id)} 
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} // Добавлен эффект подчеркивания
                    >
                        {topic.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ModuleDetail;
