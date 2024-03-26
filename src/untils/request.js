// axios 的封装处理
// 1. 根域名配置 2. 超时时间 3. 请求拦截器 / 响应拦截器

import axios from "axios";
import { getToken } from "./token";

// 自定义创建一个axios实例
const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000
})

// 添加请求拦截器,可以插入一些自定义的配置，一般是请求参数的处理
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 注入token数据  1. 获取token 2. 按照后端的格式要求做 token 拼接
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}` // 添加请求头 Authorization(token数据)
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器（在响应返回到客户端之前做拦截，重点处理返回的数据）
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export { request };
