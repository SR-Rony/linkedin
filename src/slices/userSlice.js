import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value:localStorage.getItem('userdata')?JSON.parse(localStorage.getItem('userdata')):null
  },
  reducers: {
    userData: (state,action) => {
      state.value=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { userData } = userSlice.actions

export default userSlice.reducer