import request from '../utils/request'

// 获取验证码-注册
export const getEmailCode = () => {
  return request({
    url: '/index/register/getEmailCode',
    method: 'get'
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
export const register = () => {
  return request({
    url: '/index/register/register',
    method: 'post'
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
export const setUserLabel = () => {
  return request({
    url: '/index/user_center/user_label',
    method: 'post'
  })
}



// 账号登录
export const emailLogin = () => {
  return request({
    url: '/index/login/emaillogin',
    method: 'post'
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
export const facebookLogin = () => {
  return request({
    url: '/index/index/facebook_login',
    method: 'get'
  })
}


// facebook授权登录
export const instagramLogin = () => {
  return request({
    url: '/index/index/instagram_login',
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
export const logOut = () => {
  return request({
    url: '/index/login/out',
    method: 'post'
  })
}