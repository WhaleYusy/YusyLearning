import axios, { type AxiosRequestConfig } from "axios"

const instance = axios.create({})

instance.interceptors.request.use(res => {
  return res
}, err => {
  return err
})

instance.interceptors.response.use((res) => {
  if(res.status >= 200 && res.status <= 299){
    return {
      code: 1,
      data: res.data
    }
  }
  return res
}, err => {
  return {
    code: 0,
    data: err
  }
})

export const Get = (url: string, config?: AxiosRequestConfig) => {
  return instance.get(url, config)
}

export const Post = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return instance.post(url, data, config)
}