import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaskList = ({ tasks, onSelectTask }) => {
    const navigate = useNavigate(); // Хук для навигации

    const handleTaskClick = (task) => {
        onSelectTask(task);
        if (task.title === 'Основы Java') {
            navigate('/compiler'); // Перенаправляем на компилятор
        }
    };

    return (
        <div>
            <h2>Список задач</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} onClick={() => handleTaskClick(task)}>
                        {task.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
