// src/tasks.js

// Определение интерфейса задачи (для TypeScript)
export interface Task {
    id: string;
    title: string;
    description: string;
    difficulty?: 'easy' | 'medium' | 'hard'; // Пример поля для сложности
    tags?: string[]; // Теги для фильтрации
    completed?: boolean; // Статус выполнения
}

// Данные задач
export const tasksData: Task[] = [
    {
        id: '1',
        title: 'Основы Java',
        description: 'Изучите основы Java с помощью интерактивных задач.',
        difficulty: 'easy',
        tags: ['java', 'основы'],
        completed: false,
    },
    {
        id: '2',
        title: 'ООП в Java',
        description: 'Погрузитесь в объектно-ориентированное программирование на Java.',
        difficulty: 'medium',
        tags: ['java', 'ооп'],
        completed: false,
    },
];

// Функция для получения задачи по ID
export const getTaskById = (id) => {
    return tasksData.find(task => task.id === id);
};

// Функция для получения всех задач
export const getAllTasks = () => {
    return tasksData;
};
