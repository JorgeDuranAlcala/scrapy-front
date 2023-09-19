import { ChangeEvent, useEffect } from 'react'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Loader from '@mui/material/CircularProgress'

import toast from 'react-hot-toast'

// ** hooks
import { useDebouncedState } from 'src/hooks'

type Props = {
  handleChange: (value: string) => void
  value: string
  name: string
  validate?: {
    fn: (value: string | number) => boolean
    msg: string
  }
}

const SubRowField = ({handleChange, value, name, validate}: Props) => {
  const [editValue, debouncedValue, setValue] = useDebouncedState(value)
  let isValid = true

  if(validate)
    isValid = validate.fn(editValue)

  useEffect(()=>{
    if(editValue !== value && isValid){
      handleChange(editValue)
      toast.success(`${name} actualizado!`)
    }
  },[debouncedValue])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(newValue)
  }

  return (
    <TextField
      value={editValue || ''}
      onChange={onChange}
      size='small'
      error={!isValid}
      helperText={!isValid && validate && validate.msg}
      InputProps = {{
        endAdornment: ( value !== editValue && isValid &&
          <InputAdornment position='end'>
            <Loader size={20}/>
          </InputAdornment>)
      }}
    />
  )
}

export default SubRowField
