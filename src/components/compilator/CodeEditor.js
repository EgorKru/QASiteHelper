// src/CodeEditor.js
import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ taskId }) => {
    const [code, setCode] = useState('// Напишите ваш код здесь');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedCode = localStorage.getItem(`savedCode_${taskId}`);
        if (savedCode) {
            setCode(savedCode);
        }
    }, [taskId]);

    const handleEditorChange = (value) => {
        setCode(value);
        localStorage.setItem(`savedCode_${taskId}`, value);
    };

    const handleRunCode = async () => {
        setLoading(true); // Начинаем загрузку

        // Проверяем, есть ли класс в коде
        const classPattern = /class\s+\w+/;
        let finalCode = code;

        if (!classPattern.test(code)) {
            finalCode = `
public class Main {
    public static void main(String[] args) {
        ${code}
    }
}`;
        }

        const response = await fetch('http://localhost:5001/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: finalCode }),
        });

        const result = await response.json();
        setLoading(false); // Завершаем загрузку

        if (result.error) {
            setOutput(`Ошибка: ${result.error}`);
        } else {
            setOutput(result.output);
        }
    };

    const handleClearCode = () => {
        setCode('// Напишите ваш код здесь');
        setOutput('');
        localStorage.removeItem(`savedCode_${taskId}`);
    };

    return (
        <div className="code-editor-container">
            <Editor
                height="70vh"
                defaultLanguage="java"
                value={code}
                onChange={handleEditorChange}
            />
            <button onClick={handleRunCode} disabled={loading}>
                {loading ? 'Выполнение...' : 'Запустить код'}
            </button>
            <button onClick={handleClearCode}>Очистить код</button>
            {output && <pre>Результат:\n{output}</pre>}
        </div>
    );
};

export default CodeEditor;
