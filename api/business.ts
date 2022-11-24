import request from '../utils/request'
import { IBusinessRes, IReBusinessRes,IUndoBusinessRes } from '~/model/payload/business'

// 认证申请
export const addBusiness = (data: IBusinessRes) => {
    return request({
        url: '/index/shop_to/add',
        method: 'post',
        data
    })
}

// 重新申请
export const reApplyBusiness = (data: IReBusinessRes) => {
    return request({
        url: '/index/shop_to/againadd',
        method: 'post',
        data
    })
}
// 撤销申请
export const undoApplyBusiness = (data: IUndoBusinessRes) => {
    return request({
        url: '/index/shop_to/delete',
        method: 'post',
        data
    })
}
// 商家资料
export const getBusinessInfo = (id: any) => {
    return request({
        url: '/index/shop/details?id=' + id,
        method: 'get',
    })
}

