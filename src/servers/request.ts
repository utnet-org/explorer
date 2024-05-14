// src/plugins/axios.js

import axios, { AxiosInstance } from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com', // 你的 API 地址
  timeout: 5000, // 请求超时时间（毫秒）
});
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data;
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default {
  install: (app: {
    config: { globalProperties: { $axios: AxiosInstance } };
  }) => {
    app.config.globalProperties.$axios = instance;
  },
  instance,
};
