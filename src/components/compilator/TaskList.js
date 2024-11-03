import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from './TaskContext';
import './TaskList.css';

const TaskList = () => {
    const { tasks, setSelectedTask } = useTasks();
    const navigate = useNavigate();

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        navigate('/compiler');
    };

    // Функция для добавления динамического класса в зависимости от статуса задачи
    const getTaskClass = (task) => {
        if (task.status === 'Выполнено') {
            return 'task-completed'; // Класс для выполненных задач
        }
        if (task.difficulty === 'Средний') {
            return 'task-medium'; // Класс для задач средней сложности
        }
        return 'task-default'; // Класс по умолчанию
    };

    return (
        <div className="task-list-container">
            <h2 className="task-list-title">Список задач</h2>
            <ul>
                {tasks.map(task => (
                    <li 
                        key={task.id} 
                        onClick={() => handleTaskClick(task)} 
                        className={`task-list-item ${getTaskClass(task)}`} // Динамическое добавление класса
                    >
                        <strong>{task.title}</strong> - {task.difficulty} ({task.status})
                        <p>{task.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
