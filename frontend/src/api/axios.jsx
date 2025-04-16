import axios from 'axios';
import authService from './auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const user = authService.getCurrentUser();
        if (user?.refreshToken) {
          await authService.refreshToken(user.refreshToken);
          return api(originalRequest);
        }
      } catch (err) {
        console.error('Refresh token failed:', err);
        authService.logout();
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;