import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json:charset=UTF-8',
  },
  responseType: 'json',
};

export const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status !== 200 || !res.data) {
      throw Error('请求出错');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.data;
  },
  (err: AxiosError) => {
    throw Error(err.message);
  },
);
