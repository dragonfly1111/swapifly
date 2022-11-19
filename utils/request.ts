import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { baseApiPrefix } from '~/config/baseUrl'
const request = axios.create({
  baseURL: baseApiPrefix,
  timeout: 30000,
})

// 请求拦截
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // const token = typeof ocalStorage ? localStorage.getItem('token') : ''
    // const con: any = config || {}
    // if (token) {
    //   con.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

// 响应拦截
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

export default request
