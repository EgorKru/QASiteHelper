// src/TaskDetail.js
import React from 'react';
import CodeEditor from './CodeEditor';
import { useTasks } from './TaskContext';

const TaskDetail = ({ selectedTaskId }) => {
    const { tasks } = useTasks();
    const selectedTask = tasks.find(task => task.id === selectedTaskId);

    if (!selectedTask) {
        return null; // Если нет выбранной задачи, ничего не отображаем
    }

    return (
        <div>
            <h2>{selectedTask.title}</h2>
            <p>{selectedTask.description}</p>
            <CodeEditor taskId={selectedTask.id} />
        </div>
    );
};

export default TaskDetail;
