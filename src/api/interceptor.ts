import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { getToken } from '@/utils/auth';
import axios from 'axios';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    // const token = 'test_hash_token_user_id_1';
    if (token) {
      // if (!config.headers) {
      //   config.headers = {};
      // }
      // config.headers = { token };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      ElMessage.error({
        message: res.data.message_zh || 'Error',
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  error => {
    ElMessage.error({
      message: error.msg || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);
