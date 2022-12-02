import request from '../utils/request'

// 个人资料
export const getUserDetails = (id: any) => {
    return request({
        url: '/index/shop/index?id=' + id,
        method: 'get',
    })
}
// 查看點閱率
export const userClicRate = (id: any) => {
    return request({
        url: '/index/shop_to/clickrate?id=',
        method: 'get',
    })
}
// 商品
export const userProduct = (params: any) => {
    return request({
        url: '/index/shop/product',
        method: 'get',
        params
    })
}
// 评价
export const getEvaluationList = (params: any) => {
    return request({
        url: '/index/shop/evaluation',
        method: 'get',
        params
    })
}
// followers
export const getFollowers = (params: any) => {
    return request({
        url: '/index/shop/spotlight',
        method: 'get',
        params
    })
}

// Follow緊
export const getFollowList = (params: any) => {
    return request({
        url: '/index/shop/focuson',
        method: 'get',
        params
    })
}
// 关注/取消用户
export const followUser = (data: any) => {
    return request({
        url: '/index/user/follow',
        method: 'post',
        data
    })
}


