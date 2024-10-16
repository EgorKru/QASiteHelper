// src/TaskDetail.js
import React from 'react';
import CodeEditor from './CodeEditor';
import { useTasks } from './TaskContext';
import './TaskDetail.css'; // Импортируем стили

const TaskDetail = ({ selectedTaskId }) => {
    const { tasks } = useTasks();
    const selectedTask = tasks.find(task => task.id === selectedTaskId);

    if (!selectedTask) {
        return null; // Если нет выбранной задачи, ничего не отображаем
    }

    return (
        <div className="task-detail-container">
            <h2 className="task-detail-title">{selectedTask.title}</h2>
            <p className="task-detail-description">{selectedTask.description}</p>
            <CodeEditor taskId={selectedTask.id} />
        </div>
    );
};

export default TaskDetail;
