import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import './CodeEditor.css'; // Импорт стилей

const CodeEditor = () => {
    const [code, setCode] = useState('// Напишите ваш код здесь');
    const [output, setOutput] = useState('');

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const handleRunCode = async () => {
        const response = await fetch('http://localhost:5001/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });

        const result = await response.json();
        if (result.error) {
            setOutput(`Ошибка: ${result.error}`);
        } else {
            setOutput(result.output);
        }
    };

    return (
        <div className="code-editor-container">
            <Editor
                height="70vh" // Высота редактора
                defaultLanguage="java"
                defaultValue={code}
                onChange={handleEditorChange}
            />
            <button onClick={handleRunCode}>Запустить код</button>
            {output && <pre>Результат:\n{output}</pre>} {/* Отображаем результат */}
        </div>
    );
};

export default CodeEditor;
