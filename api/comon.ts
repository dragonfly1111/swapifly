import request from '../utils/request'

export const getRegion = () => {
  return request({
    url: '/index/home/region',
    method: 'get'
  })
}

export const getLang = () => {
  return request({
    url: '/index/home/language',
    method: 'get'
  })
}
