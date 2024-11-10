import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = {
  get: (endpoint: string, params = {}) => {
    return axiosInstance.get(endpoint, { params: { appid: process.env.REACT_APP_WEARTER_API_KEY, units: 'metric', lang: 'en', ...params } });
  },
};

export default api;
