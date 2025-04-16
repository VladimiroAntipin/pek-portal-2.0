import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/users';

const getCurrentUserProfile = (accessToken) => {
    return axios.get(API_URL + '/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

const getUserById = (id, accessToken) => {
    return axios.get(API_URL + `/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

const userService = {
    getCurrentUserProfile,
    getUserById
};

export default userService;