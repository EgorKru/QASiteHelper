import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const TIMEOUT = 5000; // Timeout in milliseconds

// Function for data processing (modify as needed based on your API response)
const processData = (data) => {
    return data;
};

export const fetchItems = async (query = {}) => {
    const apiUrl = `${API_URL}/items`;

    try {
        console.log('Fetching items from:', apiUrl, 'with query:', query);
        const response = await axios.get(apiUrl, {
            params: query, // Pass query parameters for filtering/pagination
            timeout: TIMEOUT
        });

        console.log('Response received:', response.data);
        return processData(response.data);

    } catch (error) {
        if (axios.isCancel(error)) {
            console.warn('Request cancelled:', error.message);
        } else if (error.response) {
            // Server responded with a non-2xx status code
            console.error('Server Error:', error.response.status, error.response.data);
            throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);

        } else if (error.request) {
            // Request was made but no response received
            console.error('Request Error:', error.request);
            throw new Error('Network error. Please check your connection.');

        } else {
            // General error during request setup
            console.error('Unexpected Error:', error.message);
            throw new Error('An unexpected error occurred.');
        }
    }
};