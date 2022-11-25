import request from '../utils/request'
import { IBusinessRes, IReBusinessRes,IUndoBusinessRes } from '~/model/payload/business'

// 查询套餐
export const getExposureMeal = (id: any) => {
    return request({
        url: '/index/user/exposure?id=' + id,
        method: 'get',
    })
}

