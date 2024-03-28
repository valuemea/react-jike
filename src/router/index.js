import { AuthRoute } from '@/components/AuthRoute'
// import Article from '@/pages/Article'
// import Home from '@/pages/Home'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import { lazy, Suspense } from 'react'
// import Publish from '@/pages/Publish'
import { createBrowserRouter } from 'react-router-dom'

// 打包优化-配置路由懒加载
// 1. 把路由修改为由React提供的lazy函数对组件进行动态导入
// 2. 使用React内置的Suspense组件，包裹路由中element选项对应的组件
const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))
const Publish = lazy(() => import('@/pages/Publish'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute> <Layout /></AuthRoute>,
    children: [
      {
        // path: '/home',
        index: true,
        element: <Suspense fallback={'加载中'}><Home /></Suspense>
      },
      {
        path: '/article',
        // fallback 加载的一个占位
        element: <Suspense fallback={'加载中'}><Article /></Suspense>
      },
      {
        path: '/publish',
        element: <Suspense fallback={'加载中'}><Publish /></Suspense>
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
])
export default router