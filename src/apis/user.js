// 用户相关请求

import { request } from '@/untils'

// 这种格式写法是axios支持的写法，具体可查看官方文档
export function loginApI(params) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: params
  })
}
export function getProfileAPI() {
  return request({
    url: '/user/profile',
    method: 'GET',
  })
}