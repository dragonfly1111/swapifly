import request from '../utils/request'
import {IRegisterForm, IEmailForm, ILoginForm} from '~/model/payload/loginAndRegister'

// 获取验证码-注册
export const getEmailCode = (data: IEmailForm) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/register/getEmailCode',
    method: 'post',
    data
  })
}

// 获取验证码-绑定邮箱
export const bindEmailCode = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/user_center/bindEmailCode',
    method: 'get'
  })
}

// 账号注册注册
export const register = (data: IRegisterForm) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/register/register',
    method: 'post',
    data
  })
}

// 查询感兴趣的内容
export const getUserLabel = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/user_center/user_label',
    method: 'get'
  })
}

// 提交感兴趣的内容
export const setUserLabel = (data: { rid: any[] }) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/user_center/user_label',
    method: 'post',
    data
  })
}


// 账号登录
export const emailLogin = (data: ILoginForm) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/login/emaillogin',
    method: 'post',
    data
  })
}

// 谷歌授权登录
export const googleLogin = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/index/googlelogin',
    method: 'post',
    data
  })
}

// facebook授权登录
export const facebookLogin = (params: { accessToken: string }) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/index/face_login',
    method: 'get',
    params
  })
}


// ins授权登录
export const instagramLogin = (params: { accessToken: string }) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/index/ins_login',
    method: 'get',
    params
  })
}

// 绑定邮箱提交
export const doBindEmail = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/user_center/bindEmail',
    method: 'post'
  })
}

// 获取验证码-重置密码
export const resetPwdEmailCode = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/register/resetpwdEmailCode',
    method: 'post',
    data
  })
}

// 重置密码提交
export const resetPwd = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/register/resetpwd',
    method: 'post',
    data
  })
}

// 退出登录
export const userLogOut = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/login/out',
    method: 'post'
  })
}
