import request from '../utils/request'

// 获取首页广告
export const getHomeAdvert = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/home/home_advert',
    method: 'get'
  })
}

// 获取搜索广告
export const getSearchAdvert = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/search/advert',
    method: 'get'
  })
}

// 获取商品分类广告
export const getCategoryAdvert = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/category/advert',
    method: 'get',
    params
  })
}

// 获取对话广告
export const getChatAdvert = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/chat/advert',
    method: 'get'
  })
}

