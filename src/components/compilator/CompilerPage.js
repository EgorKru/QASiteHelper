// src/CompilerPage.js
import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskDetail from './TaskDetail';
import { TaskProvider } from './TaskContext';

const CompilerPage = () => {
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const handleTaskChange = (event) => {
        setSelectedTaskId(event.target.value);
    };

    return (
        <TaskProvider>
            <div>
                <h1>Компилятор Java</h1>
                <label htmlFor="task-select">Выберите задачу:</label>
                <select id="task-select" onChange={handleTaskChange}>
                    <option value="">-- Выберите задачу --</option>
                    <option value="1">Основы Java</option>
                    <option value="2">ООП в Java</option>
                </select>
                <TaskList />
                <TaskDetail selectedTaskId={selectedTaskId} />
            </div>
        </TaskProvider>
    );
};

export default CompilerPage;
