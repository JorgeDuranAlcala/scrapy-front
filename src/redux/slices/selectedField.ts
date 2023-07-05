import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import store from 'src/redux/store'

// Use it in situations when you need to
// share a select component's state

export const selectedField = createSlice({
  name: 'display',
  initialState: {
    value: ''
  },
  reducers: {
    onChange: (state, {type, payload}: PayloadAction<string>) => {
      state.value = payload
    }
  }
})

export const { onChange } = selectedField.actions

export const selected = (state: ReturnType<typeof store.getState>) => state.selectedField.value



