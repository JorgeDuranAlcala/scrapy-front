import { useState } from 'react'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { STATUSES } from 'src/types'

type StatusSelectProps = {
  value: string
}

export const StatusSelect = ({value}: StatusSelectProps) => {
  const [status, setStatus] = useState(value)

  return (
    <Select fullWidth size="small" value={status} onChange={(e) => setStatus(e.target.value)}>
        {STATUSES.map(status => (
          <MenuItem key={status} value={status}>{status}</MenuItem>
        ))}
    </Select>
  )
}
