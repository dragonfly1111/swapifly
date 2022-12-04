import request from '../utils/request'

// 获取对话列表
export const getChatList = (params: any) => {
  return request({
    url: '/index/chat/index',
    method: 'get',
    params
  })
}


// 获取对话详情
export const getChatDetail = (params: any) => {
  return request({
    url: '/index/chat/details',
    method: 'get',
    params
  })
}

// 发送信息
export const postMsg = (data: any) => {
  return request({
    url: '/index/chat/add',
    method: 'post',
    data
  })
}

// 评价
export const addEvaluation = (data: any) => {
  return request({
    url: '/index/chat/evaluation',
    method: 'post',
    data
  })
}

// 查看评价
export const viewEvaluation = (params: any) => {
  return request({
    url: '/index/chat/view',
    method: 'get',
    params
  })
}

// 标记售出
export const setSoldOut = (params: any) => {
  return request({
    url: '/index/chat/soldout',
    method: 'get',
    params
  })
}

// 封存 / 取消封存
export const fcsave = (params: any) => {
  return request({
    url: '/index/chat/fcsave',
    method: 'get',
    params
  })
}

// 封锁 / 取消封锁
export const fssave = (params: any) => {
  return request({
    url: '/index/chat/fssave',
    method: 'get',
    params
  })
}

// 删除对话
export const deleteChat = (params: any) => {
  return request({
    url: '/index/chat/delete',
    method: 'get',
    params
  })
}
