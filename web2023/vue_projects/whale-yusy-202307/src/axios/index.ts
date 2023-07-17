import axios, { type AxiosRequestConfig } from "axios"

const instance = axios.create({})

instance.interceptors.request.use(res => {
  return res
}, err => {
  return err
})

instance.interceptors.response.use(res => instanceSuccess(res), err => instanceFail(err))

const instanceSuccess:any = (res: any) => {
  return {
    code: 1,
    data: res.data,
  }
}

const instanceFail = (err: any) => {
  return {
    code: 0,
    data: err.message || '接口返回失败',
  }
}

export const Get = (url: string, config?: AxiosRequestConfig) => {
  return instance.get(url, config)
}

export const Post = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return instance.post(url, data, config)
}