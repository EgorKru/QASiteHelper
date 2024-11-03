import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const TIMEOUT = 5000;

const processData = (data) => {
    // Обработка данных (например, фильтрация, сортировка)
    return data;
};

export const fetchItems = async (query = {}) => {
    try {
        console.log("Запрос к API:", `${API_URL}/items`, query);
        const response = await axios.get(`${API_URL}/items`, {
            params: query,
            timeout: TIMEOUT,
        });
        console.log("Ответ от API:", response.data);
        return processData(response.data);
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        throw new Error("Не удалось получить данные. Попробуйте снова.");
    }
};
