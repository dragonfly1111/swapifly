import request from '../utils/request'

// 通知消息
export const noticelist = (params: any) => {
  return request({
    url: '/index/user_center/noticelist',
    method: 'get'
  })
}


