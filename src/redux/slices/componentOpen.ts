import { createSlice } from '@reduxjs/toolkit'
import store from 'src/redux/store'

// Use it in situations when you need to give display control
// over a Drawer or Modal's open state to an external element.
// See example at: src/components/Tables/UserTable/index

export const componentOpen = createSlice({
  name: 'display',
  initialState: {
    opened: false
  },
  reducers: {
    open: (state) => {
      state.opened = true
    },
    close: (state) => {
      state.opened = false
    },
  }
})

export const selectOpened = (state: ReturnType<typeof store.getState>) => state.componentOpen.opened

