import request from '../utils/request'
import {IBusinessRes, IReBusinessRes, IUndoBusinessRes} from '~/model/payload/business'

// 查询套餐
export const getExposureMeal = (id: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/user/exposure?id=' + id,
    method: 'get',
  })
}


// 购买套餐
export const buyExposure = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/order/buyexposure',
    method: 'post',
    data
  })
}

// 支付状态查询
export const exposureStatus = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/order/queryorder',
    method: 'get',
    params
  })
}
