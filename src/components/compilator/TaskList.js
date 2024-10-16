// src/TaskList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from './TaskContext';
import './TaskList.css'; // Импортируем стили

const TaskList = () => {
    const { tasks, setSelectedTask } = useTasks();
    const navigate = useNavigate();

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        navigate(`/compiler/${task.id}`); // Переход на страницу компилятора с выбранной задачей
    };

    return (
        <div className="task-list-container">
            <h2 className="task-list-title">Список задач</h2>
            {tasks.length === 0 ? (
                <p className="no-tasks-message">Задачи отсутствуют.</p> // Сообщение при отсутствии задач
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id} className="task-list-item">
                            <button 
                                className="task-button" 
                                onClick={() => handleTaskClick(task)}
                                aria-label={`Перейти к задаче ${task.title}`} // Адаптация для доступности
                            >
                                {task.title}
                            </button>
                            <p className="task-description">{task.description}</p> {/* Описание задачи */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
