import { useState } from 'react'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

type StatusSelectProps = {
  value: string
}

export const StatusSelect = ({value}: StatusSelectProps) => {
  const [status, setStatus] = useState(value)

  return (
    <Select fullWidth size="small" value={status} onChange={(e) => setStatus(e.target.value)}>
        <MenuItem value='contact'>Contacto</MenuItem>
        <MenuItem value='e'>ejemplo</MenuItem>
    </Select>
  )
}
