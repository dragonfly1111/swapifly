import request from '../utils/request'

// 图片上传
export const uploadToOss = (data: any) => {
  return request({
    url: '/index/oss/Upload',
    method: 'post',
    data
  })
}


// 获取地区
export const getRegion = () => {
  return request({
    url: '/index/home/region',
    method: 'get'
  })
}

// 获取语言
export const getLang = () => {
  return request({
    url: '/index/home/language',
    method: 'get'
  })
}

// 获取商品排序下拉
export const getGoodSort = () => {
  return request({
    url: '/index/home/ddsort',
    method: 'get'
  })
}

// 获取新旧程度下拉
export const getOan = () => {
  return request({
    url: '/index/home/oan',
    method: 'get'
  })
}
// 违禁词
export const getPdw = () => {
  return request({
    url: '/index/home/pdw',
    method: 'get'
  })
}

// 新消息提示
export const getMsgDot = (params: any) => {
  return request({
    url: '/index/user_center/notice',
    method: 'get',
    params
  })
}
