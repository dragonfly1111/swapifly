import request from '../utils/request'

// 查询个人资料
export const getUserInfo = () => {
  return request({
    url: '/index/up_center/user_deit',
    method: 'get'
  })
}
// 更新个人资料
export const updateUserInfo = (data: object) => {
  return request({
    url: '/index/up_center/user_deit',
    method: 'post',
    data
  })
}
// 修改密码
export const updatePassword = (data: object) => {
  return request({
    url: '/index/up_center/cpwd',
    method: 'post',
    data
  })
}
// 绑定邮箱
export const bindEmail = () => {
  return request({
    url: '/index/up_center/bindEmail',
    method: 'post'
  })
}
// 获取绑定邮箱验证码
export const getBindEmailCode = (params: object) => {
  return request({
    url: '/index/up_center/bindEmailCode',
    method: 'get',
    params
  })
}
