import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import activeMsg from './slices/activeMsg'

export default configureStore({
  reducer: {
    user:userSlice,
    active:activeMsg
  },
})