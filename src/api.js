// src/api.js

// Импорт библиотеки axios для HTTP запросов
import axios from 'axios';

// Базовый URL
const API_URL = 'http://localhost:5000';

// Асинхронная функция для получения элементов с сервера
export const fetchItems = async () => {
    try {
        // GET на получение данных с URL
        const response = await axios.get(`${API_URL}/items`);
        
        // Возвращаем полученные данные
        return response.data;
    } catch (error) {
        // Если произошла ошибка, выводим сообщение об ошибке в консоль
        console.error("Ошибка при получении данных:", error);
        
        // Возвращаем пустой массив в случае ошибки, чтобы избежать сбоев в приложении
        return [];
    }
};
