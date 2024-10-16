import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';

const CodeEditor = () => {
    const [code, setCode] = useState('// Напишите ваш код здесь');

    const handleEditorChange = (value) => {
        setCode(value);
    };

    return (
        <Editor
            height="90vh" // Задайте желаемую высоту
            defaultLanguage="java"
            defaultValue={code}
            onChange={handleEditorChange}
        />
    );
};

export default CodeEditor;
