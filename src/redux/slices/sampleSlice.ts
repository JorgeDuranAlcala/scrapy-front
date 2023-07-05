// import { serviceGetModels } from "@/services"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type sampleInitialState = {
  someVal: string
  anotherVal: {
    val: string[]
    something: number
  }
}

const initialState: sampleInitialState = {
  someVal: '',
  anotherVal: {
    val: [],
    something: 0
  }
}

const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    pathVal(state, { type, payload }: PayloadAction<string>) {
      return {
        ...state,
        someVal: payload
      }
    }
  }
})

export default sampleSlice
