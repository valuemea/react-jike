import { request } from "@/untils";
import { getToken, setToken as _setToken } from '@/untils/token';
import { createSlice } from '@reduxjs/toolkit';

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken('token_key') || '',
    userInfo: {}
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
  }
})
const { setToken, setUserInfo } = userStore.actions

// 13800000002   246810   这个手机号和验证码可以正确登录
const fetchLogin = (loginForm) => async (dispatch) => {
  const res = await request.post('/authorizations', loginForm)
  dispatch(setToken(res.data.data.token))
}
// 获取个人用户信息
const fetchUserInfo = () => async (dispatch) => {
  const res = await request.get('/user/profile')
  dispatch(setUserInfo(res.data.data))
}


export { setToken, fetchLogin, fetchUserInfo };
export default userStore.reducer