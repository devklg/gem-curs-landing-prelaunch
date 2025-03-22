import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

export const enrollmentService = {
    submitPreEnrollment: async (data) => {
        try {
            const response = await api.post('/enrollment/pre-enroll', data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Enrollment failed');
        }
    }
};

export default api; 