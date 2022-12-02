import request from '../utils/request'
import {IBusinessRes, IReBusinessRes, IUndoBusinessRes} from '~/model/payload/business'

// 查询套餐
export const getExposureMeal = (id: any) => {
  return request({
    url: '/index/user/exposure?id=' + id,
    method: 'get',
  })
}


// 购买套餐
export const buyExposure = (data: any) => {
  return request({
    url: '/index/order/buyexposure',
    method: 'post',
    data
  })
}

// 支付状态查询
export const exposureStatus = (params: any) => {
  return request({
    url: '/index/user/exposure',
    method: 'get',
    params
  })
}
