import request from '../utils/request'

// 获取商品分类
export const getGoodsClassList = () => {
  return request({
    url: '/index/home/productrule',
    method: 'get'
  })
}
