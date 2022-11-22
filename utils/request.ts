import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { baseApiPrefix } from '~/config/baseUrl'
// import { useCookie } from "nuxt/app";
const request = axios.create({
  baseURL: baseApiPrefix,
  timeout: 30000,
  // withCredentials: true
})

// const localeSetting = useCookie('locale')
// 请求拦截
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // const token = typeof ocalStorage ? localStorage.getItem('token') : ''
    // const con: any = config || {}
    // if (token) {
    //   con.headers.Authorization = `Bearer ${token}`
    // }
    console.log(config)
    // // @ts-ignore
    // areaSetting.value ? config.headers['X-Region'] = areaSetting.value : ''
    // // @ts-ignore
    // localeSetting.value ? config.headers['X-Lang'] = localeSetting.value : ''

    if((config.method === 'post' || config.method === 'POST') && config.data){
      // 如果是post请求 全部转成formData
      const formData = new FormData()
      for(const key in config.data){
        formData.append(key, config.data[key])
      }
      config.data = formData
      // @ts-ignore
      config.headers['Content-Type'] = 'multipart/form-data'
    }
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
