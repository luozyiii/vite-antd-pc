import { message } from 'antd';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

interface FetchOptions extends AxiosRequestConfig {
  ignoreToken?: boolean | undefined; // 忽略 token 的添加
  ignoreMsg?: boolean | undefined; // 忽略信息提示
}

const requestInterceptorsSuccess = (config: FetchOptions) => {
  // 在请求发送之前做些什么
  const { ignoreToken, headers = {}, method, data, ...other }: any = config || {};
  const lowerMethod = method?.toLocaleLowerCase();
  other.method = lowerMethod;
  //  请求参数
  if (data) {
    if (['get', 'delete'].includes(lowerMethod)) {
      other.params = data;
    } else {
      other.data = data;
    }
  }
  // add token
  const token = 'hi token';
  if (!ignoreToken && token) {
    headers.Authorization = token;
    other.headers = headers;
  }
  return other;
};

const requestInterceptorsError = (error: any) => {
  // 对请求错误做些什么
  return Promise.reject(error);
};

const responseInterceptorsSuccess = (response: AxiosResponse) => {
  // 对响应数据做些什么
  const {
    data: { code, desc },
    config: { ignoreMsg, responseType },
  } = response;
  if (responseType !== 'blob') {
    if (code !== 2000 && !ignoreMsg) {
      const _desc = desc || '未知错误';
      message.error(_desc);
    }
  }
  return response;
};

const responseInterceptorsError = (error: any) => {
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
