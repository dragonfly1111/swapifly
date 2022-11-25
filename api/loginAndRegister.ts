import request from '../utils/request'
import { IRegisterForm, IEmailForm, ILoginForm } from '~/model/payload/loginAndRegister'

// 获取验证码-注册
export const getEmailCode = (data: IEmailForm) => {
  return request({
    url: '/index/register/getEmailCode',
    method: 'post',
    data
  })
}

// 获取验证码-绑定邮箱
export const bindEmailCode = () => {
  return request({
    url: '/index/user_center/bindEmailCode',
    method: 'get'
  })
}

// 账号注册注册
export const register = (data: IRegisterForm) => {
  return request({
    url: '/index/register/register',
    method: 'post',
    data
  })
}

// 查询感兴趣的内容
export const getUserLabel = () => {
  return request({
    url: '/index/user_center/user_label',
    method: 'get'
  })
}

// 提交感兴趣的内容
export const setUserLabel = (data:{rid: any[]}) => {
  return request({
    url: '/index/user_center/user_label',
    method: 'post',
    data
  })
}



// 账号登录
export const emailLogin = (data: ILoginForm) => {
  return request({
    url: '/index/login/emaillogin',
    method: 'post',
    data
  })
}

// 谷歌授权登录
export const googleLogin = () => {
  return request({
    url: '/index/index/googlelogin',
    method: 'get'
  })
}

// facebook授权登录
export const facebookLogin = (params: {accessToken: string}) => {
  return request({
    url: '/index/index/face_login',
    method: 'get',
    params
  })
}


// facebook授权登录
export const instagramLogin = (params: {accessToken: string}) => {
  return request({
    url: '/index/index/ins_login',
    method: 'get'
  })
}

// 绑定邮箱提交
export const doBindEmail = () => {
  return request({
    url: '/index/user_center/bindEmail',
    method: 'post'
  })
}

// 获取验证码-重置密码
export const resetPwdEmailCode = () => {
  return request({
    url: '/index/register/resetpwdEmailCode',
    method: 'get'
  })
}

// 重置密码提交
export const resetPwd = () => {
  return request({
    url: '/index/register/resetpwd',
    method: 'post'
  })
}

// 退出登录
export const userLogOut = () => {
  return request({
    url: '/index/login/out',
    method: 'post'
  })
}
