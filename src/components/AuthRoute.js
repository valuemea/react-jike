import { getToken } from '@/untils'
import { Navigate } from 'react-router-dom'
// 封装高阶组件,根据token控制路由跳转
// 技术方案：以路由组件为参数，在内部根据token有无做判断，有则返回路由组件，没有则返回登录页面
export function AuthRoute({ children }) {
  const token = getToken()
  if (token) return <>{children}</>
  else return <Navigate to={'/login'} replace></Navigate>
}
