import axios from "axios";
import type { AxiosRequestConfig } from "axios";
const instance = axios.create({
  withCredentials: true,
});

export const Get = (url: string, params?: AxiosRequestConfig) => {
  return instance.get(url, params);
};
export const Post = (
  url: string,
  params?: any,
  config?: AxiosRequestConfig
) => {
  return instance.post(url, params, config);
};
