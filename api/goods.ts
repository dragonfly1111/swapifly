import request from '../utils/request'

// 获取商品分类
export const getGoodsClassList = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/home/productrule',
    method: 'get'
  })
}

// 获取搜索记录
export const getSearchHistory = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/home/search_log',
    method: 'get'
  })
}

// 获取热门品牌
export const getHotBrad = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/home/hot_brand',
    method: 'get'
  })
}

// 获取商品列表（首页）
export const getProductList = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/home/productlist',
    method: 'get',
    params
  })
}

// 获取商品列表（分类）
export const getCategoryProductList = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/category/productlist',
    method: 'get',
    params
  })
}

// 获取搜索列表
export const getHotSearch = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/home/hot_search',
    method: 'get',
    params
  })
}

// 举报商品
export const reportProduct = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/user_center/report_product',
    method: 'post',
    data
  })
}

// 商品搜索
export const productSearch = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/search/productlist',
    method: 'get',
    params
  })
}

// 删除搜索记录
export const delSearchLog = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/user_center/search_del',
    method: 'get'
  })
}

// 收藏搜索关键词
export const searchAdd = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/user_center/search_add',
    method: 'post',
    data
  })
}

// 收藏搜索关键词
export const searchScDel = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/user_center/search_scdel',
    method: 'get',
    params
  })
}


// 商品分类列表
export const categoryHotBrand = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/category/hot_brand',
    method: 'get',
    params
  })
}
// 删除商品
export const deleteProduct = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product/delete',
    method: 'post',
    data
  })
}
// 上架/下架
export const upanddownProduct = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product/upanddown',
    method: 'post',
    data
  })
}
// 商品详情
export const getProductDetails = (id: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product_detail/index?id=' + id,
    method: 'get',
  })
}
// 类似的商品
export const getSimilarlist = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product_detail/similarlist',
    method: 'get',
    params
  })
}
// like
export const collectionProduct = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product/collection',
    method: 'post',
    data
  })
}
// 出价
export const offerchat = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/chat/offerchat',
    method: 'post',
    data
  })
}


// 编辑商品>>>>>>>>>>>>>>
// 用户面交地址
export const getProductAddress = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product/address',
    method: 'get'
  })
}
// 草稿列表
export const getProductDraftlist = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product/draftlist',
    method: 'get'
  })
}
// 草稿详情
export const getProductDraftDetails = (id: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product/draftdetails?id=' + id,
    method: 'get'
  })
}
// 删除草稿
export const delProductDraft = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product/delete_draft',
    method: 'post',
    data
  })
}
// 保存草稿
export const addProductDraft = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product/add_draft',
    method: 'post',
    data,
  })
}
// 保存草稿-出售
export const addProduct = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product/add',
    method: 'post',
    data
  })
}
// 编辑商品
export const editProduct = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product/edit',
    method: 'post',
    data
  })
}
// 编辑商品-查询
export const getProductInfo = (id: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product/edit?id=' + id,
    method: 'get',
  })
}
// 查询商品封禁状态
export const getProductFj = (id: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product_detail/fjzt?id=' + id,
    method: 'get',
  })
}
// 移除保存的地址
export const removeSaveAd = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product/delete_adds',
    method: 'post',
    data
  })
}
// 商品详情广告
export const detailAD = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product_detail/detail_advert',
    method: 'get'
  })
}

