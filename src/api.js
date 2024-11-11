import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const TIMEOUT = 5000;

const processData = (data) => {
    // Обработка данных
    return data;
};

export const fetchItems = async (query = {}) => {
    const apiUrl = `${API_URL}/items`;

    try {
        console.log('Запрос к API:', apiUrl, query);

        const response = await axios.get(apiUrl, {
            params: query,
            timeout: TIMEOUT,
        });

        console.log('Ответ от API:', response.data);
        return processData(response.data);

    } catch (error) {
        //обработка ошибок
        if (axios.isCancel(error)) {
            console.error('Запрос был отменён:', error.message);
        } else if (error.response) {
            // Сервер ответил с кодом состояния, отличным от 2xx
            console.error('Проблема с ответом от сервера:', error.response.status, error.response.data);
        } else if (error.request) {
            // Запрос был сделан, но не получен ответ
            console.error('Проблема с запросом:', error.request);
        } else {
            console.error('Общая ошибка в настройке запроса:', error.message);
        }
        throw new Error('Не удалось получить данные. Попробуйте снова.');
    }
};
