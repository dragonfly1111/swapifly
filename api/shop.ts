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
export const evaluationList = (params: any) => {
    return request({
        url: '/index/shop/evaluation',
        method: 'get',
        params
    })
}
// followers
export const getFollowers = (id: any) => {
    return request({
        url: '/index/shop/spotlight?id=' + id,
        method: 'get',
    })
}

// Follow緊
export const getFollowList = (id: any) => {
    return request({
        url: '/index/shop/focuson?id=' + id,
        method: 'get',
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


