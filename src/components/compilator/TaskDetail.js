import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from './TaskContext';
import './TaskDetail.css'; // Убедитесь, что импортируете CSS

const TaskDetail = () => {
    const { selectedTask } = useTasks();
    const navigate = useNavigate();

    if (!selectedTask) {
        return <div className="task-detail">Выберите задачу из списка</div>;
    }

    const topics = [
        { id: '1', title: 'Введение в Java' },
        { id: '2', title: 'Переменные и типы данных' },
        { id: '3', title: 'Условные операторы' },
        { id: '4', title: 'Циклы' },
        { id: '5', title: 'Методы и функции' },
        { id: '6', title: 'Объектно-ориентированное программирование' },
    ];

    const handleTopicClick = (topicId) => {
        navigate(`/topic/${topicId}`);
    };

    return (
        <div className="task-detail">
            <h2>{selectedTask.title}</h2>
            <p>
                Этот модуль создан для того, чтобы ознакомиться с основами Java и восполнить потенциальные пробелы.
                Мы также познакомимся с основными понятиями Java и объектно-ориентированного программирования.
            </p>
            <h3>Темы модуля:</h3>
            <ul>
                {topics.map(topic => (
                    <li 
                        key={topic.id} 
                        onClick={() => handleTopicClick(topic.id)} 
                        className="topic-item" // Используем класс вместо инлайнового стиля
                    >
                        {topic.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskDetail;
