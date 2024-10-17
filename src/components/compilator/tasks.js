// Перечисления для сложности
const Difficulty = {
    Beginner: 'Начальный',
    Intermediate: 'Средний',
    Advanced: 'Продвинутый'
};

// Перечисления для статуса задач
const TaskStatus = {
    NotCompleted: 'Не выполнено',
    InProgress: 'В процессе',
    Completed: 'Выполнено'
};

// Массив с задачами
export const tasksData = [
    {
        id: '1',
        title: 'Основы Java',
        description: 'Изучите основы Java с помощью интерактивных задач.',
        difficulty: Difficulty.Beginner,
        status: TaskStatus.NotCompleted,
    },
    {
        id: '2',
        title: 'ООП в Java',
        description: 'Погрузитесь в объектно-ориентированное программирование на Java.',
        difficulty: Difficulty.Intermediate,
        status: TaskStatus.NotCompleted,
    },
    {
        id: '3',
        title: 'Работа с коллекциями в Java',
        description: 'Изучите коллекции и их использование в Java.',
        difficulty: Difficulty.Intermediate,
        status: TaskStatus.NotCompleted,
    },
    {
        id: '4',
        title: 'Исключения в Java',
        description: 'Научитесь обрабатывать исключения в Java.',
        difficulty: Difficulty.Intermediate,
        status: TaskStatus.NotCompleted,
    },
];
