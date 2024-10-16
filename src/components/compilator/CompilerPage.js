// src/CompilerPage.js
import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskDetail from './TaskDetail';
import { TaskProvider, useTasks } from './TaskContext';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'; // Импортируем компоненты Material-UI
import './CompilerPage.css';

const TaskSelector = ({ onChange }) => {
    const { tasks } = useTasks(); // Получаем список задач из контекста

    return (
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: '20px' }}>
            <InputLabel id="task-select-label">Выберите задачу</InputLabel>
            <Select
                labelId="task-select-label"
                onChange={onChange}
                defaultValue=""
            >
                <MenuItem value="">
                    <em>-- Выберите задачу --</em>
                </MenuItem>
                {tasks.map(task => (
                    <MenuItem key={task.id} value={task.id}>
                        {task.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const CompilerPage = () => {
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const handleTaskChange = (event) => {
        setSelectedTaskId(event.target.value);
    };

    return (
        <TaskProvider>
            <div className="compiler-page">
                <h1>Редактор кода</h1> {/* Добавьте заголовок для страницы */}
                <TaskSelector onChange={handleTaskChange} />
                <TaskList />
                <TaskDetail selectedTaskId={selectedTaskId} />
            </div>
        </TaskProvider>
    );
};

export default CompilerPage;
