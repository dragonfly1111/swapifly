import request from '../utils/request'

// 图片上传
export const uploadToOss = (data: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/oss/Upload',
    method: 'post',
    data
  })
}


// 获取地区
export const getRegion = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/home/region',
    method: 'get'
  })
}

// 获取语言
export const getLang = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/home/language',
    method: 'get'
  })
}

// 获取商品排序下拉
export const getGoodSort = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/home/ddsort',
    method: 'get'
  })
}

// 获取新旧程度下拉
export const getOan = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/home/oan',
    method: 'get'
  })
}
// 违禁词
export const getPdw = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/home/pdw',
    method: 'get'
  })
}

// 新消息提示
export const getMsgDot = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/user_center/notice',
    method: 'get',
    params
  })
}
