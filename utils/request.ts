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
    const info = process.client ? sessionStorage.getItem('USER-INFO') : ''
    let userObj: any
    if (info) {
      userObj = JSON.parse(info)
      if(userObj.token){
        // @ts-ignore
        config.headers['X-UToken'] = userObj.token
        // @ts-ignore
        config.headers['X-Userid'] = userObj.id
      }
    }

    // todo 暂时写死 需要将这两个切换到session储存
    // @ts-ignore
    config.headers['X-Region'] = 1
    // @ts-ignore
    config.headers['X-lang'] = 'zh'
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
