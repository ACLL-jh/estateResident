import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface McAxiosRequestConfig extends AxiosRequestConfig {
  extraConfig?: {
    tokenRetryCount: number; // 标记当前请求的csrf token重试次数
  };
}
const timeout = 60000; // 请求超时时间和延迟请求超时时间统一设置
const config: McAxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
};

const instance = axios.create(config);

instance.interceptors.request.use(async (config: McAxiosRequestConfig) => {
  if (!config.extraConfig?.tokenRetryCount) {
    config.extraConfig = {
      tokenRetryCount: 0,
    };
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  (config.headers as any)['Authorization'] = <string>(
    sessionStorage.getItem('token')
  );
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (err: any) => {
    if (window.navigator.onLine) {
      console.log('网络异常');
    }

    if (axios.isCancel(err)) {
      // 取消的请求，不报错
      return;
    }

    if (err.message === 'Network Error') {
      console.log('Network Error');

      return;
    }
    if (err.message.includes('timeout')) {
      return;
    }
    if (err.response?.status >= 500) {
      return;
    }

    const { data: responseData } = err.response || {};
    const { status } = responseData || {};
    if (status) {
      switch (parseInt(status)) {
        case 4001:
          break;
        default:
          break;
      }
    }
    return err.response;
  }
);

const get = (url: string, params?: any): Promise<AxiosResponse<any>> => {
  return instance.get(url, { params });
};
const post = (url: string, data?: any,contentType?:any): Promise<AxiosResponse<any>> => {
  console.log(contentType);
  
  return instance.post(url, data,contentType);
};
const del = (url: string, params?: any): Promise<AxiosResponse<any>> => {
  return instance.delete(url, { params });
};
const put = (url: string, data?: any): Promise<AxiosResponse<any>> => {
  return instance.put(url, data);
};
export { get, post, del, put };
