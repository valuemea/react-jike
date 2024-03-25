import logo from '@/assets/logo.png'
import { fetchLogin } from '@/store/modules/user'
import { toHaveFormValues } from '@testing-library/jest-dom/matchers'
import { Button, Card, Form, Input, message } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    await dispatch(fetchLogin(values))
    navigate('/')   // 跳转到首页
    message.success('登录成功')
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form validateTrigger="onBlur" onFinish={onFinish}>
          <Form.Item
            name='mobile'
            //  多条校验逻辑，按顺序校验
            rules={[
              { required: true, message: '请输入手机号' },
              {
                pattern: /1[3-9]\d{9}$/,
                message: '请输入正确的手机号格式'
              }
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item name='code' rules={[{ required: true, message: '请输入验证码' }]}>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login