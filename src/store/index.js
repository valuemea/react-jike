import { configureStore } from '@reduxjs/toolkit'
import userStore from './modules/user'

const store = configureStore({
  reducer:userStore
})
export default store