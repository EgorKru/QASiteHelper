import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import TaskList from './TaskList';
import TaskDetail from './TaskDetail';
import { tasksData } from './tasks'; // Импорт задач

const CompilerPage = () => {
    const [selectedTask, setSelectedTask] = useState(null);

    return (
        <div>
            <h1>Компилятор Java</h1>
            <TaskList tasks={tasksData} onSelectTask={setSelectedTask} />
            {selectedTask && <TaskDetail task={selectedTask} />}
            <CodeEditor />
        </div>
    );
};

export default CompilerPage;
