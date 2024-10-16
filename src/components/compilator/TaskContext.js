// src/TaskContext.js
import React, { createContext, useContext, useState } from 'react';
import { tasksData } from './tasks';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [selectedTask, setSelectedTask] = useState(null);

    return (
        <TaskContext.Provider value={{ tasks: tasksData, selectedTask, setSelectedTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
};
