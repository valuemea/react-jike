# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

# 项目相关信息
### 介绍

react 学习的一个完整的实战案例. 该项目实现的主要功能是登录进入项目、文章发布、列表展示、图表统计功能。

主要运用了react路由，redux,hook封装，网络请求等一系列技术.

该项目主要针对react学习的知识进行一个总合应该，实现了核心功能，可能有一些小点未完善，但不影响功能的使用

接口的调用是否正确返回的处理及提示信息未做处理，若接口返回错误，项目可能会报错
### 开发项目步骤

* 创建项目并初始化，安装项目所使用的包
* 配置别名路由，使用起来更加方便
* 配置基础路由Router
* 使用github 项目管理
* 页面开发
* 项目打包
  * 项目打包：将源代码和资源文件进行处理，生成可在生产环境中运行的静态文件的远程
  * 打包命令：npm run build
* 本地预览（模拟服务器运行项目）
  * 本地预览：在本地通过静态服务器模拟生产服务器运行项目的过程
  * 步骤：
    * 安装本地服务包： npm i -g serve
    * serve -s build
    * 浏览器中访问 http://localhost:3000/
* 打包优化-配置路由懒加载
  * 路由懒加载是指路由的js资源只有在被访问时才会动态获取，目的是为了优化项目首次打开的时间
  * 配置步骤
    * 把路由修改为由React提供的lazy函数对组件进行动态导入
    * 使用React内置的Suspense组件，包裹路由中element选项对应的组件
    ```
      import { AuthRoute } from '@/components/AuthRoute'
      import Layout from '@/pages/Layout'
      import Login from '@/pages/Login'
      import { lazy, Suspense } from 'react'
      import { createBrowserRouter } from 'react-router-dom'
    
      const Home = lazy(() => import('@/pages/Home'))
      const Article = lazy(() => import('@/pages/Article'))
      const Publish = lazy(() => import('@/pages/Publish'))

      const router = createBrowserRouter([
        {
          path: '/',
          element: <AuthRoute> <Layout /></AuthRoute>,
          children: [
            {
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
    ```
* 打包优化-包体积分析
  * 包体积分析: 通过可视化的方式，直观的体现项目中各种包打包之后的体积大小，方便做优化。需要借助一个source-map-explorer 插件
  * 实现步骤
    * 安装包：npm i source-map-explorer
    * 配置命令指定要分析的js文件
    * 执行命令：yarn scrname  执行完该命令则会打开一个页面，可直观的看到包的体积大小 
    ```
    <!-- package.json 文件配置 -->
      {
        ...
        "scripts": {
          ....
          // 通过这个三方包，指定要分析那些js文件.analyze这个名称可以随意定义
          "analyze":"source-map-explorer 'build/static/js/*.js'" 
        },
        ...
      }
    ```
* 打包优化-CDN优化
  * CDN是一种内容分发网络服务，当用户请求网站内容时，由离用户最近的服务器将缓存的资源内容传递给用户.目的就是加快首页加载速度
  * 哪些资源可以放到CDN服务器？
    * 体积较大，需要利用CDN文件在浏览器的缓存特性，加快加载时间
    * 非业务js文件，不需要经常做变动，CDN不用频繁更新缓存
  * 项目中怎么做
    * 把需要做CDN缓存的文件排除在打包之外（react,react-dom）
    * 以CDN的方式重新引入资源(react,react-dom)
  * 实现代码：通过 craco 来修改 webpack 配置，从而实现 CDN 优化 (注意这个代码测试没运行起来，HtmlWebpackPlugin的问题，实际中遇到的话需要再看看)
    
    `craco.config.js`
    ```javascript
      const path = require('path')  // 内置的模块
      const { whenProd, getPlugin, pluginByName } = require('@craco/craco')
      module.exports = {
        webpack: {
          // 别名配置
          alias: {
            // 约定：使用 @ 表示 src 文件所在路由
            '@': path.resolve(__dirname, 'src')
          },
          // 配置CDN
          configure: (webpackConfig) => {
            let cdn = {
              js: []
            }
            whenProd(() => {
              // key: 不参与打包的包(由dependencies依赖项中的key决定)
              // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
              webpackConfig.externals = {
                // react: 'React',
                // 'react-dom': 'ReactDOM'
              }
              // 配置现成的cdn资源地址
              // 实际开发的时候 用公司自己花钱买的cdn服务器
              cdn = {
                js: [
                  // 'https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js',
                  // 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js',
                ]
              }
            })
            // 通过 htmlWebpackPlugin插件 在public/index.html注入cdn资源url
            const { isFound, match } = getPlugin(
              webpackConfig,
              pluginByName('HtmlWebpackPlugin')
            )

            if (isFound) {
              console.log(88888);
              // 找到了HtmlWebpackPlugin的插件
              match.userOptions.cdn = cdn
            }
            return webpackConfig
          }
        }
      }
    ```
    `public/index.html`
    ```html
    <body>
      <div id="root"></div>
      <!-- 加载第三发包的 CDN 链接 -->
     <!-- 动态插入cdn资源url -->
     <% htmlWebpackPlugin.options.cdn.js.forEach(cdnURL=> { %>
       <script src="<%= cdnURL %>"></script>
       <% }) %>
    </body>
    ```
### 页面开发
* 登录页
  * 页面展示（静态结构，样式，表单校验，获取表单数据）
  * 封装 request 请求模块 （项目中会有很多的网络请求，使用axios 三方库做好统一封装，方便管理）
    * 几乎所有的接口都是一样的接口域名
    * 几乎所有的接口都需要设置一样的超时时间
    * 几乎所有的接口都需要做 Token 权限处理。。。
  * 调接口提交表单数据，获取 token 数据
  * 使用Redux管理token(token作为一个用户的标识数据，需要在很多个模块中共享)
    * 在redux中管理token数据
    * token 持久化
    * 封装token的存取删方法。token会在项目的多个模块中使用，为了共享复用可封装成工具函数(untils)
  * 在网络请求axios请求头中注入token
  * 根据token控制路由跳转（比较有些页面不需要登录就可以看，而有些路由需要登录之后才可以看）
    * 封装一个高级组件
    * 以路由组件为参数，在内部根据token有无做判断，有则返回路由组件，没有则返回登录页面
    ```
      import { getToken } from '@/untils'
      import { Navigate } from 'react-router-dom'
      // 封装高阶组件,根据token控制路由跳转
      // 技术方案：以路由组件为参数，在内部根据token有无做判断，有则返回路由组件，没有则返回登录页面
      export function AuthRoute({ children }) {
        const token = getToken()
        if (token) return <>{children}</>
        else return <Navigate to={'/login'} replace></Navigate>
      }
    ```
    ```
    const router = createBrowserRouter([
      {
        path: '/',
        element: <AuthRoute> <Layout /></AuthRoute>
      }
    ])
    ```
* Layout 页面
  * Layou 结构创建(页面布局)和样式重置
  * Layout 二级路由配置
    * 准备二级路由组件
    * router 中通过children配置项进行配置
    * 在layout 组件中配置二级路由出口
  * layout 点击左侧菜单可以跳转到对应的目标路由
    * 菜单参数item中的key属性换成路由的路径地址
    * 菜单绑定点击事件，点击时通过key获取到路由地址进行跳转(跳转使用useNavigate函数)
  * 根据当前路由路径高亮菜单(实现效果：页面刷新时可以根据当前的路由路径让对应的左侧菜单高亮显示)
    * 获取当前url上的路径(使用react提示的钩子函数useLocation())
    * 找到菜单组件负责高亮属性，绑定当前的路由路径 
  * layout 展示个人信息（个人信息也是在redux中维护数据）
  * layout 退出登录：1. 提示用户是否退出  2. 清除用户信息 3. 跳转到登录页面
  * layout 处理token失效 (在网站中长时间未做任何操作，token 就会失效 )
    * 通常在token 失效后再去请求接口，后端返回 401 姿态码，前端可以监控这个状态做后续的操作
    * 前端做的事
      * 在axios拦截中监控401状态码
      * 清除失效token,跳转登录 (注意跳转时需要刷新一下页面，否则跳转不过去)
      ```
        // 添加响应拦截器（在响应返回到客户端之前做拦截，重点处理返回的数据）
        request.interceptors.response.use(function (response) {
          // 对响应数据做点什么
          return response;
        }, function (error) {
          // 对响应错误做点什么
          if(error.response.status === 401){
            removeToken()
            router.navigate('/login')
            window.location.reload()  // 页面刷新，redux中的数据也会重置
          }
          return Promise.reject(error);
        });
      ```
* home 页面
  * Echarts 基础图标渲染，使用看官方文档即可。注意，图表的渲染需要指定存放图表的节点的宽高
  * echarts 组件封装
* 拓展-API模块封装
  * 问题描述：当前的接口请求放到了功能实现的位置，没有固定的模块内维护，后期查找维护困难
  * 解决思路：把项目中的所有接口按照业务模块以函数的形式统一封装到apis模块中。(注意不同的团队可能有不同的封装形式，具体看实际项目)
  ```
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
        method: 'GET',****
      })
    }
  ```
* 创建文章页面
  * 页面展示（静态结构，样式，富文本）
  * 收集数据并提交
  * 上传文章封面功能实现
  * 编辑文章数据并提交
* 文章管理页面
  * 页面展示（静态结构，样式）
  * 获取频道数据，封装一个自定义hook函数（由于在创建文章页面中也有该功能函数，可抽离出来，封装了一函数。创建文章中修改也调用该函数）
  * 渲染表格数据
  * 表格适配文章状态、筛选功能、分页功能实现
  * 表格数据删除，编辑（跳转到编辑页面）功能实现
### 使用到的插件
1. antd: react UI组件库
2. @reduxjs/toolkit、react-redux：redux 共享数据
3. react-router-dom：react 路由
4. axios：网络请求
5. echarts：图表插件
6. normalize.css： 初始化（重置）样式
7. react-quill：富文本插件
8. source-map-explorer: 包体积分析