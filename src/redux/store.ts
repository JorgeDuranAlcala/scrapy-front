import { componentOpen, sampleSlice, selectedField } from './slices'
import { configureStore } from '@reduxjs/toolkit'

// import {} from "@/features"

const store = configureStore({
  reducer: {
    sample: sampleSlice.reducer,
    componentOpen: componentOpen.reducer,
    selectedField: selectedField.reducer
  }
})

export default store
