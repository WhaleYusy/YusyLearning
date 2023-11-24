import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
  baseURL: "/api", // 请求的基础路径前缀
  timeout: 60000, // 超时接口报错
});

request.interceptors.request.use((config) => {
  // 请求拦截器配置对象
  return config;
});

request.interceptors.response.use(
  (response) => {
    // 相应拦截器成功的回调
    return response.data;
  },
  (error) => {
    const status = error.response.status;
    switch (status) {
      case 404:
        ElMessage({
          type: "error",
          message: "请求失败路径出现问题",
        });
        break;
      case 500 | 501 | 502 | 503 | 504 | 505:
        ElMessage({
          type: "error",
          message: "服务器挂了",
        });
        break;
      case 401:
        ElMessage({
          type: "error",
          message: "参数有误",
        });
        break;
      default:
        break;
    }
    return Promise.reject(new Error(error.message));
  }
);

// 务必对外暴露request
export default request;
