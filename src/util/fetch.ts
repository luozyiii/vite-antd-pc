import axios from 'axios';
import { message } from 'antd';
import type { AxiosRequestConfig, AxiosResponse, Method, InternalAxiosRequestConfig } from 'axios';

interface FetchOptions extends AxiosRequestConfig {
  ignoreToken?: boolean | undefined; // 忽略 token 的添加
  ignoreMsg?: boolean | undefined; // 忽略信息提示
}

const requestInterceptorsSuccess = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // 在请求发送之前做些什么
  const { method, data } = config;
  const lowerMethod = method?.toLowerCase();

  //  请求参数
  if (data && lowerMethod) {
    if (['get', 'delete'].includes(lowerMethod)) {
      config.params = data;
      delete config.data;
    }
  }

  // add token
  const token = 'hi token';
  const ignoreToken = (config as unknown as Record<string, unknown>).ignoreToken;
  if (!ignoreToken && token) {
    config.headers = config.headers || {};
    config.headers.Authorization = token;
  }

  return config;
};

const requestInterceptorsError = (error: unknown) => {
  // 对请求错误做些什么
  return Promise.reject(error);
};

const responseInterceptorsSuccess = (response: AxiosResponse) => {
  // 对响应数据做些什么
  const { data, config } = response;
  const ignoreMsg = (config as unknown as Record<string, unknown>).ignoreMsg;
  const responseType = config.responseType;

  if (responseType !== 'blob' && data) {
    const { code, desc } = data;
    if (code !== 2000 && !ignoreMsg) {
      const _desc = desc || '未知错误';
      message.error(_desc);
    }
  }
  return response;
};

const responseInterceptorsError = (error: unknown) => {
  // 对响应错误做些什么
  message.error('网络异常，请稍后重试！');
  return Promise.reject(error);
};

// 普通请求 start
const instance = axios.create();
// 请求前拦截
instance.interceptors.request.use(requestInterceptorsSuccess, requestInterceptorsError);
// 响应数据拦截
instance.interceptors.response.use(responseInterceptorsSuccess, responseInterceptorsError);

const fetch = (url: string, method: Method = 'get', config?: FetchOptions) => {
  return (fetchData?: object | undefined) => {
    const options = {
      url,
      method,
      ...config,
    };
    if (fetchData) {
      options.data = fetchData;
    }
    return instance(options);
  };
};
// 普通请求 end

// 文件下载
const fetchBlobInstance = axios.create({
  responseType: 'blob',
});

// 请求前拦截
fetchBlobInstance.interceptors.request.use(requestInterceptorsSuccess, requestInterceptorsError);
// 响应数据拦截
fetchBlobInstance.interceptors.response.use(responseInterceptorsSuccess, responseInterceptorsError);

export const fetchBlob = (url: string, method: Method = 'get', config?: FetchOptions) => {
  return (fetchData?: object | undefined) => {
    const options = {
      url,
      method,
      ...config,
    };
    if (fetchData) {
      options.data = fetchData;
    }
    return fetchBlobInstance(options);
  };
};

export default fetch;
