import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
// todo 切换至env
import { baseApiPrefix } from '~/config/baseUrl'
import { Message } from "@arco-design/web-vue";
import { useUserInfo } from "~/stores/userInfo";
import { useResize } from '~/stores/resize';
const request = axios.create({
  baseURL: baseApiPrefix,
  timeout: 30000,
  // withCredentials: true
})

// 请求拦截
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const info = process.client ? sessionStorage.getItem('USER-INFO') : ''
    let userObj: any
    if (info) {
      userObj = JSON.parse(info)
      if (userObj.token) {
        // @ts-ignore
        config.headers['X-UToken'] = userObj.token
        // @ts-ignore
        config.headers['X-Userid'] = userObj.id
      }
    }

    // @ts-ignore
    // config.headers['X-Region'] = 1
    // @ts-ignore
    // config.headers['X-lang'] = 'zh'
    if(process.client){
      const areaSetting = useState<string>('area.setting')
      const localeSetting = useState<string>('locale.setting')
      // @ts-ignore
      areaSetting.value ? config.headers['X-Region'] = areaSetting.value : ''
      // @ts-ignore
      localeSetting.value ? config.headers['X-Lang'] = localeSetting.value : ''
    }


    if ((config.method === 'post' || config.method === 'POST') && config.data) {
      // 如果是post请求 全部转成formData
      const formData = new FormData()
      for (const key in config.data) {
        // 处理数组
        if (Object.prototype.toString.call(config.data[key]) === '[object Array]' && config.data[key].length) {
          var arr = config.data[key]
          // @ts-ignore
          arr.map((item, i) => {
            if(typeof item === 'object') {
              // 展开数组里的对象
              for(const itemKey in item){
                formData.append(`${key}[${i}][${itemKey}]`, item[itemKey])
              }
            } else {
              formData.append(`${key}[${i}]`, item)
            }
          });
        } else {
          formData.append(key, config.data[key])
        }
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
    const userInfo = useUserInfo();
    if (response.data.code === 999) {
      console.log('登录失效拦截')
      // 登录过期 跳转首页
      const router = useRouter();
      const openLogin = useState<Boolean>('openLogin')
      const resize = useResize();
      userInfo.logout();
      if (resize.screenType !== 'MOBILE'){
          userInfo.openDialog();
          openLogin.value = true;
          console.log(openLogin);
      }
      return Promise.reject({})
    } else if(response.data.code === 998){
      // 账号封禁
      userInfo.openBlockDialog()
      return Promise.reject({})
    }
    return response.data
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

export default request
