import { useState, ChangeEvent, useEffect } from 'react'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Loader from '@mui/material/CircularProgress'
import { useGridApiContext } from '@mui/x-data-grid'

import yup from 'src/@core/utils/customized-yup'
import toast from 'react-hot-toast'

const emailSchema = yup.string().email()

type Props = {
  handleEmailChange: (email: string) => void
  email: string
  id: string
}

const EmailField = ({handleEmailChange, email, id}: Props) => {
  const [editEmail, setEditEmail] = useState(email)
  const api = useGridApiContext()
  const savedEmail = api.current.getCellValue(id, 'email')
  let isValid = true

  try {
    emailSchema.validateSync(editEmail)
   } catch{
    isValid = false
  }

  const submitTimeout = setTimeout(() => {
    if(editEmail !== savedEmail && isValid){
      handleEmailChange(editEmail)
      toast.success('Email actualizado!')
    }
  }, 1000)

  useEffect(()=>{
    clearTimeout(submitTimeout)
    return ()=> { clearTimeout(submitTimeout)}
  },[])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setEditEmail(newValue)
    clearTimeout(submitTimeout)
  }

  return (
    <TextField
      value={editEmail || ''}
      onChange={onChange}
      size='small'
      error={!isValid}
      helperText={!isValid && 'Email invalido'}
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
