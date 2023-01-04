import request from '../utils/request'

// 通知消息
export const noticelist = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/user_center/noticelist',
    method: 'get',
    params
  })
}


