import request from '../utils/request'

// 获取首页广告
export const getHomeAdvert = () => {
  return request({
    url: '/index/home/home_advert',
    method: 'get'
  })
}

// 获取搜索广告
export const getSearchAdvert = () => {
  return request({
    url: '/index/search/advert',
    method: 'get'
  })
}

// 获取商品分类广告
export const getCategoryAdvert = (params: any) => {
  return request({
    url: '/index/category/advert',
    method: 'get',
    params
  })
}

// 获取对话广告
export const getChatAdvert = () => {
  return request({
    url: '/index/chat/advert',
    method: 'get'
  })
}

