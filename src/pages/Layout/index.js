import { fetchUserInfo } from '@/store/modules/user';
import {
  DiffOutlined,
  EditOutlined, HomeOutlined, LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, Popconfirm } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './index.scss';
const { Header, Sider } = Layout;
const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
    path: '/article'
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const Index = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo = {} } = useSelector(state => state.user)
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])
  const onMenuClick = (route) => {
    const path = route.key
    navigate(path)
  }
  const location = useLocation()  // 获取当前路由路径
  return (
    <Layout  >
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={location.pathname}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick={onMenuClick}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Index;