import { ChangeEvent, useEffect } from 'react'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Loader from '@mui/material/CircularProgress'
import { useGridApiContext } from '@mui/x-data-grid'

import toast from 'react-hot-toast'

// ** hooks
import { useDebouncedState } from 'src/hooks'

type Props = {
  handleAdSiteChange: (adSite: string) => void
  adSite: string
  id: string
}

const AdSiteField = ({handleAdSiteChange, adSite, id}: Props) => {
  const [ editAdSite, debouncedAdSite, setAdSite ] = useDebouncedState(adSite)
  const api = useGridApiContext()
  const savedAdSite = api.current.getCellValue(id, 'adSite')

  useEffect(()=>{
    if(editAdSite !== savedAdSite){
      handleAdSiteChange(editAdSite)
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
        endAdornment: ( savedAdSite !== editAdSite &&
          <InputAdornment position='end'>
            <Loader size={20}/>
          </InputAdornment>)
      }}
    />
  )
}

export default AdSiteField
