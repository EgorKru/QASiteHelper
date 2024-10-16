// src/TaskList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from './TaskContext';

const TaskList = () => {
    const { tasks, setSelectedTask } = useTasks();
    const navigate = useNavigate();

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        if (task.title === 'Основы Java') {
            navigate('/compiler');
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
