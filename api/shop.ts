import request from '../utils/request'

// 个人资料
export const getUserDetails = (id: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/shop/index?id=' + id,
    method: 'get',
  })
}
// 查看點閱率
export const getUserClicRate = (id: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/shop_to/clickrate',
    method: 'get',
  })
}
// 商品
export const userProduct = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/shop/product',
    method: 'get',
    params
  })
}
// 评价
export const getEvaluationList = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/shop/evaluation',
    method: 'get',
    params
  })
}
// followers
export const getFollowers = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/shop/spotlight',
    method: 'get',
    params
  })
}

// Follow緊
export const getFollowList = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/shop/focuson',
    method: 'get',
    params
  })
}
// 关注/取消用户
export const followUser = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/user/follow',
    method: 'post',
    data
  })
}
// 举报用户
export const reportUser = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/user_center/report_user',
    method: 'post',
    data
  })
}
// 检验成效
export const getUserProductReport = (id: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/product/report?id=' + id,
    method: 'post',
  })
}


