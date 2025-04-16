import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/auth';

const register = (surname, name, email, password) => {
    return axios.post(API_URL + '/signup', {
        surname,
        name,
        email,
        password
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + '/signin', {
            email,
            password
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const refreshToken = (refreshToken) => {
    return axios.post(API_URL + '/refresh-token', { refreshToken }).then((response) => {
        if (response.data.accessToken) {
            const user = JSON.parse(localStorage.getItem('user'));
            user.accessToken = response.data.accessToken;
            localStorage.setItem('user', JSON.stringify(user));
        }
        return response.data;
    });
};

const logout = (refreshToken) => {
    localStorage.removeItem('user');
    return axios.post(API_URL + '/signout', { refreshToken });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    register,
    login,
    refreshToken,
    logout,
    getCurrentUser
};

export default authService;