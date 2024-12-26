import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({ baseURL: BASE_URL });

instance.interceptors.request.use(
    (config) => {
        config.headers = config.headers || {};

        config.headers.Accept = 'application/json';
        config.headers['Content-Type'] = 'application/json';

        let token = localStorage.getItem('accessToken') || '';

        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error): Promise<string> => {
        return Promise.reject(error?.response?.data?.message);
    }
);

const http = instance;

export default http;
