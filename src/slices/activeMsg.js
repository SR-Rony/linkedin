import { createSlice } from '@reduxjs/toolkit'

export const activeMsg = createSlice({
  name: 'activeMsg',
  initialState: {
    // value:localStorage.getItem('activeMsg')?JSON.parse(localStorage.getItem('activeMsg')):null
    value:''
  },
  reducers: {
    activeUser: (state,action) => {
      state.value=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { activeUser } = activeMsg.actions

export default activeMsg.reducer