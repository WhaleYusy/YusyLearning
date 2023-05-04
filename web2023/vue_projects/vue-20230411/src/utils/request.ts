import axios from '@/axios/index'

export const Get = (url: string ,params = {}) => {
  return axios.get(url, params)
}

export const Post = (url: string ,data = {}, config = {}) => {
  return axios.post(url, data, config)
}