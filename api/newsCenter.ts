import request from '../utils/request'

// 新闻列表
export const newsList = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/news/index',
    method: 'get',
    params
  })
}

// 近期新闻
export const recentNews = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/news/nearfuture',
    method: 'get'
  })
}

// 新闻详情
export const newsDetail = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/news/details',
    method: 'get',
    params
  })
}


