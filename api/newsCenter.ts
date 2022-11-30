import request from '../utils/request'

// 新闻列表
export const newsList = (params) => {
  return request({
    url: '/index/news/index',
    method: 'get',
    params
  })
}

// 近期新闻
export const recentNews = () => {
  return request({
    url: '/index/news/nearfuture',
    method: 'get'
  })
}

// 新闻详情
export const newsDetail = (params: any) => {
  return request({
    url: '/index/news/details',
    method: 'get',
    params
  })
}


