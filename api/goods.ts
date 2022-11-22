import request from '../utils/request'

// 获取商品分类
export const getGoodsClassList = () => {
  return request({
    url: '/index/home/productrule',
    method: 'get'
  })
}

// 获取搜索记录
export const getSearchHistory = () => {
  return request({
    url: '/index/home/search_log',
    method: 'get'
  })
}


// 获取热门品牌
export const getHotBrad = () => {
  return request({
    url: '/index/home/hot_brand',
    method: 'get'
  })
}

// 获取商品列表
export const getProductlist = () => {
  return request({
    url: '/index/home/productlist',
    method: 'get'
  })
}

// 获取搜索列表
export const getHotSearch = () => {
  return request({
    url: '/index/home/hot_search',
    method: 'get'
  })
}

// 举报商品
export const reportProduct = () => {
  return request({
    url: '/index/user_center/report_product',
    method: 'post'
  })
}

// 商品搜索
export const productSearch = () => {
  return request({
    url: '/index/search/productlist',
    method: 'get'
  })
}

// 删除搜索记录
export const delSearchLog = () => {
  return request({
    url: '/index/user_center/search_del',
    method: 'get'
  })
}

// 收藏搜索关键词
export const searchAdd = () => {
  return request({
    url: '/index/user_center/search_add',
    method: 'post'
  })
}

// 收藏搜索关键词
export const searchScDel = () => {
  return request({
    url: '/index/user_center/search_scdel',
    method: 'get'
  })
}

// 商品分类列表
export const categoryProductList = () => {
  return request({
    url: '/index/user_center/search_scdel',
    method: 'get'
  })
}

// 商品分类列表
export const categoryHotBrand = () => {
  return request({
    url: '/category/hot_brand',
    method: 'get'
  })
}

