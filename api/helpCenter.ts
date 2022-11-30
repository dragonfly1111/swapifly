import request from '../utils/request'

// 帮助文章
export const helpList = () => {
  return request({
    url: '/index/help/index',
    method: 'get'
  })
}

// 帮助一级主题
export const helpTheme = () => {
  return request({
    url: '/index/help/themerule',
    method: 'get'
  })
}

// 帮助搜索
export const helpSearch = (params: any) => {
  return request({
    url: '/index/help/search',
    method: 'get',
    params
  })
}

// 帮助详情
export const helpDetail = (params: any) => {
  return request({
    url: '/index/help/details',
    method: 'get',
    params
  })
}

