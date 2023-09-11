import { ChangeEvent, useEffect } from 'react'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Loader from '@mui/material/CircularProgress'
import { useGridApiContext } from '@mui/x-data-grid'

import toast from 'react-hot-toast'

// ** hooks
import { useDebouncedState } from 'src/hooks'

type Props = {
  handleChange: (value: string) => void
  value: string
  id: string
  field: string
}

const SubRowField = ({handleChange, value, id, field}: Props) => {
  const [ editAdSite, debouncedAdSite, setAdSite ] = useDebouncedState(value)
  const api = useGridApiContext()
  const savedAdSite = api.current.getCellValue(id, field)

  useEffect(()=>{
    if(editAdSite !== savedAdSite){
      handleChange(editAdSite)
      toast.success('Actualizado!')
    }
  },[debouncedAdSite])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setAdSite(newValue)
  }

  return (
    <TextField
      value={editAdSite || ''}
      onChange={onChange}
      size='small'
      InputProps = {{
        endAdornment: ( debouncedAdSite !== editAdSite &&
          <InputAdornment position='end'>
            <Loader size={20}/>
          </InputAdornment>)
      }}
    />
  )
}

export default SubRowField
