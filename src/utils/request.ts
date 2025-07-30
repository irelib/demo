import axios from "axios";

const request = axios.create({
  // baseURL: '',
  timeout: 8000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    if (config.method === "get" && !config.params && config.data) {
      config.params = config.data;
    }
    if (config.params && typeof config.params !== "object") {
      throw new Error("params 参数必须为对象");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default request;
