import request from '../utils/request'
import {IEmailForm} from "~/model/payload/loginAndRegister";

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
export const bindEmail = (data: any) => {
  return request({
    url: '/index/user_center/bindEmail',
    method: 'post',
    data
  })
}
// 获取绑定邮箱验证码
export const getBindEmailCode = (data: IEmailForm) => {
  return request({
    url: '/index/user_center/bindEmailCode',
    method: 'post',
    data
  })
}

// 获取通知消息
export const getNoticeList = () => {
  return request({
    url: '/index/user_center/noticelist',
    method: 'get'
  })
}

// 点赞记录
export const getLikeLog = (params: any) => {
  return request({
    url: '/index/user_center/like_log',
    method: 'get',
    params
  })
}

// 点赞/取消点赞
export const likeCancel = () => {
  return request({
    url: '/index/user_center/like_cancel',
    method: 'get'
  })
}

