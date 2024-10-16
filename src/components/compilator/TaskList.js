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

    return (
        <div className="task-list-container">
            <h2 className="task-list-title">Список задач</h2>
            <ul>
                {tasks.map(task => (
                    <li 
                        key={task.id} 
                        onClick={() => handleTaskClick(task)} 
                        className="task-list-item"
                    >
                        <strong>{task.title}</strong> - {task.difficulty} ({task.status}) {/* Отображение дополнительных свойств */}
                        <p>{task.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
