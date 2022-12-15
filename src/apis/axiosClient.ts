import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import queryString from 'query-string';
import store from 'src/redux/store';
import {getAPIBaseUrl} from 'src/utils/urls';

const axiosClient = axios.create({
  baseURL: getAPIBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  error => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('token');
      window.location.href = '/401';
    }
    return Promise.reject(error.response?.data);
  }
);

export default axiosClient;
