import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    CssBaseline,
} from '@mui/material';
import './CodeEditor.css';

const CodeEditor = ({ taskId }) => {
    const [code, setCode] = useState('// Напишите ваш код здесь');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    // Загружаем сохраненный код из localStorage при монтировании компонента
    useEffect(() => {
        const savedCode = localStorage.getItem(`savedCode_${taskId}`);
        if (savedCode) {
            setCode(savedCode);
        }
    }, [taskId]);

    // Обработчик изменения кода в редакторе
    const handleEditorChange = (value) => {
        setCode(value);
        localStorage.setItem(`savedCode_${taskId}`, value);
    };

    // Обработчик запуска кода
    const handleRunCode = async () => {
        setLoading(true);

        const classPattern = /class\s+\w+/;
        let finalCode = code;

        // Если код не содержит класс, оборачиваем его в Main класс
        if (!classPattern.test(code)) {
            finalCode = `
public class Main {
    public static void main(String[] args) {
        ${code}
    }
}`;
        }

        try {
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
        } catch (error) {
            setLoading(false);
            setOutput(`Ошибка: ${error.message}`);
        }
    };

    // Обработчик очистки кода
    const handleClearCode = () => {
        setCode('// Напишите ваш код здесь');
        setOutput('');
        localStorage.removeItem(`savedCode_${taskId}`);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            <CssBaseline />
            <AppBar position="static" sx={{ backgroundColor: '#2D2D2D' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#00ff00' }}>
                        Редактор кода
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleRunCode}
                        disabled={loading}
                        className="green-button" // Использование зеленой кнопки
                    >
                        {loading ? 'Выполнение...' : 'Запустить код'}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleClearCode}
                        className="green-button" // Использование зеленой кнопки
                        sx={{ ml: 2 }}
                    >
                        Очистить код
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ mt: 2 }}>
                <Editor
                    height="70vh"
                    defaultLanguage="java"
                    value={code}
                    onChange={handleEditorChange}
                    options={{
                        selectOnLineNumbers: true,
                        automaticLayout: true,
                        fontSize: 14, // Настройте размер шрифта
                        theme: 'vs-dark', // Тема редактора
                    }}
                />
            </Box>
            {output && (
                <pre>
                    Результат: {output}
                </pre>
            )}
        </Container>
    );
};

export default CodeEditor;
