import request from '../utils/request'

export const getGoodsClassList = () => {
  return request({
    url: '/index/home/productrule',
    method: 'get'
  })
}
