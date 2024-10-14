// src/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/items`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return []; // Возвращаем пустой массив в случае ошибки
    }
};

