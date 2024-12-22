import axios from 'axios';

export const isAuthenticated = async () => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (!token) return false;

    try {
        const response = await axios.get('http://localhost:8080/auth/verify-token', {
            headers: { Authorization: `Bearer ${token}` }, // Add token to Authorization header
        });
        return response.status === 200; // Return true if the token is valid
    } catch (error) {
        console.error('Token verification failed:', error);
        return false; // Return false if the token is invalid or expired
    }
};
