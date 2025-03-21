import axios from 'axios';

const API_PORT = import.meta.env.VITE_API_PORT || '3000';
const API_BASE_URL = `http://localhost:${API_PORT}/api`;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const enrollmentService = {
    submitPreEnrollment: async (formData) => {
        try {
            const response = await api.post('/enrollment/pre-enroll', formData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default api; 