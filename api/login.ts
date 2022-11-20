import request from '../utils/request'

// 查询感兴趣的内容
export const getUserLabel = () => {
  return request({
    url: '/index/user_center/user_label',
    method: 'get'
  })
}
