import React from 'react';
import CodeEditor from './CodeEditor';

const TaskDetail = ({ task }) => {
    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <CodeEditor />
        </div>
    );
};

export default TaskDetail;
