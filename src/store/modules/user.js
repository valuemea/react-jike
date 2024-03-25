import { request } from "@/untils";
import { createSlice } from '@reduxjs/toolkit';

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token_key') || ''
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      localStorage.setItem('token_key', action.payload)
    }
  }
})
const { setToken } = userStore.actions

// 13800000002   246810   这个手机号和验证码可以正确登录
const fetchLogin = (loginForm) => async (dispatch) => {
  const res = await request.post('authorizations', loginForm)
  dispatch(setToken(res.data.data.token))
}

export { setToken, fetchLogin };
export default userStore.reducer