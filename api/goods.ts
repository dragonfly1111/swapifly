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

// 获取商品列表（首页）
export const getProductList = (params: any) => {
  return request({
    url: '/index/home/productlist',
    method: 'get',
    params
  })
}

// 获取商品列表（分类）
export const getCategoryProductList = (params: any) => {
  return request({
    url: '/index/category/productlist',
    method: 'get',
    params
  })
}

// 获取搜索列表
export const getHotSearch = (params: any) => {
  return request({
    url: '/index/home/hot_search',
    method: 'get',
    params
  })
}

// 举报商品
export const reportProduct = (data: any) => {
  return request({
    url: '/index/user_center/report_product',
    method: 'post',
    data
  })
}

// 商品搜索
export const productSearch = (params: any) => {
  return request({
    url: '/index/search/productlist',
    method: 'get',
    params
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
export const searchAdd = (data: any) => {
  return request({
    url: '/index/user_center/search_add',
    method: 'post',
    data
  })
}

// 收藏搜索关键词
export const searchScDel = (params: any) => {
  return request({
    url: '/index/user_center/search_scdel',
    method: 'get',
    params
  })
}

// // 商品分类列表
// export const categoryProductList = () => {
//   return request({
//     url: '/index/user_center/search_scdel',
//     method: 'get'
//   })
// }

// 商品分类列表
export const categoryHotBrand = (params: any) => {
  return request({
    url: '/index/category/hot_brand',
    method: 'get',
    params
  })
}
// 删除商品
export const deleteProduct = (data: any) => {
  return request({
    url: '/index/product/delete',
    method: 'post',
    data
  })
}
// 上架/下架
export const upanddownProduct = (data: any) => {
  return request({
    url: '/index/product/upanddown',
    method: 'post',
    data
  })
}
// 商品详情
export const getProductDetails = (id: any) => {
  return request({
    url: '/index/product_detail/index?id=' + id,
    method: 'get',
  })
}
// 类似的商品
export const getSimilarlist = (params: any) => {
  return request({
    url: '/index/product_detail/similarlist',
    method: 'get',
    params
  })
}
// like
export const collectionProduct = (data: any) => {
  return request({
    url: '/index/product/collection',
    method: 'post',
    data
  })
}
// 出价
export const offerchat = (data: any) => {
  return request({
    url: '/index/chat/offerchat',
    method: 'post',
    data
  })
}


// 编辑商品>>>>>>>>>>>>>>
// 用户面交地址
export const getProductAddress = () => {
  return request({
    url: '/index/product/address',
    method: 'get'
  })
}
// 草稿列表
export const getProductDraftlist = () => {
  return request({
    url: '/index/product/draftlist',
    method: 'get'
  })
}
// 草稿详情
export const getProductDraftDetails = (id: any) => {
  return request({
    url: '/index/product/draftdetails?id=' + id,
    method: 'get'
  })
}
// 删除草稿
export const delProductDraft = (data: any) => {
  return request({
    url: '/index/product/delete_draft',
    method: 'post',
    data
  })
}
// 保存草稿
export const addProductDraft = (data: any) => {
  return request({
    url: '/index/product/add_draft',
    method: 'post',
    data,
  })
}
// 保存草稿-出售
export const addProduct = (data: any) => {
  return request({
    url: '/index/product/add',
    method: 'post',
    data
  })
}
// 编辑商品
export const editProduct = (data: any) => {
  return request({
    url: '/index/product/edit',
    method: 'post',
    data
  })
}
// 编辑商品-查询
export const getProductInfo = (id: any) => {
  return request({
    url: '/index/product/edit?id=' + id,
    method: 'get',
  })
}
// 查询商品封禁状态
export const getProductFj = (id: any) => {
  return request({
    url: '/index/product_detail/fjzt?id=' + id,
    method: 'get',
  })
}
// 移除保存的地址
export const removeSaveAd = (data: any) => {
  return request({
    url: '/index/product/delete_adds',
    method: 'post',
    data
  })
}
// 商品详情广告
export const detailAD = () => {
  return request({
    url: '/index/product_detail/detail_advert',
    method: 'get'
  })
}

