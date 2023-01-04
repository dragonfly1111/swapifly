import request from '../utils/request'
import {IBusinessRes, IReBusinessRes, IUndoBusinessRes} from '~/model/payload/business'

// 认证申请
export const addBusiness = (data: IBusinessRes) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/shop_to/add',
    method: 'post',
    data
  })
}

// 重新申请
export const reApplyBusiness = (data: IReBusinessRes) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/shop_to/againadd',
    method: 'post',
    data
  })
}
// 撤销申请
export const undoApplyBusiness = (data: IUndoBusinessRes) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/shop_to/delete',
    method: 'post',
    data
  })
}
// 商家资料
export const getBusinessInfo = (id: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/shop/details?id=' + id,
    method: 'get',
  })
}

