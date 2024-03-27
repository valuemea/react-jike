// 封装和文章相关的接口函数
import { request } from '@/untils'

// 获取频道列表
export function getChannelAPI() {
  return request({
    url: '/channels',
    method: 'GET',
  })
}
// 提交文章表单
export function createArticleAPI(params) {
  return request({
    url: '/mp/articles?draft=false',  // draft 文章状态 true:草稿 false:发布
    method: 'POST',
    data: params
  })
}
// 获取文章列表
export function getArticleListAPI(params) {
  return request({
    url: '/mp/articles',  
    method: 'GET',
    params: params
  })
}