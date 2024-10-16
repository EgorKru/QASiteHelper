import React, { createContext, useContext, useState } from 'react';
import { tasksData } from './tasks'; // Импорт данных задач

// Создание контекста
const TaskContext = createContext();

// Провайдер для управления задачами
export const TaskProvider = ({ children }) => {
    const [selectedTask, setSelectedTask] = useState(null); // Состояние для выбранной задачи

    return (
        <TaskContext.Provider value={{ tasks: tasksData, selectedTask, setSelectedTask }}>
            {children} {/* Оборачиваем дочерние компоненты в провайдер */}
        </TaskContext.Provider>
    );
};

// Хук для использования контекста задач
export const useTasks = () => {
    return useContext(TaskContext); // Возвращаем контекст
};
