import { useState, useEffect } from "react";

const DEFAULT_TIMEOUT = 1000 // Miliseconds

// State management for situations requiring
// setting state under a timeout constraint.
// For example: A live-result searchbox
const useDebouncedState = <T,>(initialState: T, timeout?: number) => {
  const [debounced, setDebounce] = useState(initialState)
  const [data, setData] = useState(initialState)

  const stateChange = setTimeout(() => {
    if(debounced !== data){
      setDebounce(data)
    }
  }, timeout || DEFAULT_TIMEOUT)

  const handleChange = (input: typeof initialState) => {
    clearTimeout(stateChange)
    setData(input)
  }

  useEffect(() =>{
    clearTimeout(stateChange)
  }, [])

  return [data, debounced, handleChange] as const
}

export default useDebouncedState
