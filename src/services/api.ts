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
    return axiosInstance.get(endpoint, { params: { appid: 'b7315577fa190000af08be923e6cb02d', units: 'metric', lang: 'en', ...params } });
  },
};

export default api;
