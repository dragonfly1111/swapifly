import request from '../utils/request'

// 帮助文章
export const helpList = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/help/index',
    method: 'get'
  })
}

// 帮助一级主题
export const helpTheme = () => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/help/themerule',
    method: 'get'
  })
}

// 帮助搜索
export const helpSearch = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/help/search',
    method: 'get',
    params
  })
}

// 帮助详情
export const helpDetail = (params: any) => {
  const config = useRuntimeConfig()
  return request({
    url: config.VITE_API_BASE + '/index/help/details',
    method: 'get',
    params
  })
}

