// src/useLocalStorage.js
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
    // Определяем состояние для хранения значения
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            // Проверяем наличие item и парсим его, или возвращаем начальное значение
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading localStorage key “' + key + '”: ', error);
            return initialValue;
        }
    });

    // Функция для установки значения
    const setValue = (value) => {
        try {
            // Обрабатываем значение, если это функция
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            // Обновляем localStorage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error('Error setting localStorage key “' + key + '”: ', error);
        }
    };

    // useEffect для синхронизации storedValue с localStorage
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item !== JSON.stringify(storedValue)) {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            }
        } catch (error) {
            console.error('Error syncing localStorage key “' + key + '”: ', error);
        }
    }, [key, storedValue]); // Обновляем только при изменении key или storedValue

    return [storedValue, setValue];
};

export default useLocalStorage;
