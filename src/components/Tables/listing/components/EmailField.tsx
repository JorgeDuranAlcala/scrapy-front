import { ChangeEvent, useEffect } from 'react'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Loader from '@mui/material/CircularProgress'
import { useGridApiContext } from '@mui/x-data-grid'

import yup from 'src/@core/utils/customized-yup'
import toast from 'react-hot-toast'

// ** hooks
import { useDebouncedState } from 'src/hooks'

const emailSchema = yup.string().email()

type Props = {
  handleEmailChange: (email: string) => void
  email: string
  id: string
}

const EmailField = ({handleEmailChange, email, id}: Props) => {
  const [editEmail, debouncedEmail, setEmail] = useDebouncedState(email)
  const api = useGridApiContext()
  const savedEmail = api.current.getCellValue(id, 'email')
  let isValid = true

  try {
    emailSchema.validateSync(editEmail)
   } catch{
    isValid = false
  }

  useEffect(()=>{
    if(editEmail !== savedEmail && isValid){
      handleEmailChange(editEmail)
      toast.success('Email actualizado!')
    }
  },[debouncedEmail])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setEmail(newValue)
  }

  return (
    <TextField
      value={editEmail || ''}
      onChange={onChange}
      size='small'
      error={!isValid}
      helperText={!isValid && 'Email inválido'}
      InputProps = {{
        endAdornment: ( savedEmail !== editEmail && isValid &&
          <InputAdornment position='end'>
            <Loader size={20}/>
          </InputAdornment>)
      }}
    />
  )
}

export default EmailField
