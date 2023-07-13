import { useState, useEffect } from 'react'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { type GridRenderCellParams } from '@mui/x-data-grid'

import { STATUSES } from 'src/types'


export const StatusSelect = ({value, id, api, field}: GridRenderCellParams) => {
  const [status, setStatus] = useState(value)

  const onChange= (option: string) => {
    setStatus(option)
    api.startCellEditMode({id, field})
  }

  const cellMode = api.getCellMode(id, field)

  useEffect(() => {
    if(cellMode === 'edit'){
      api.setEditCellValue({id, field, value: status})
      api.stopCellEditMode({id, field})
    }
  }, [cellMode])

  return (
    <Select fullWidth size="small" value={value} onChange={(e) => onChange(e.target.value)}>
        {STATUSES.map(status => (
          <MenuItem key={status} value={status}>{status}</MenuItem>
        ))}
    </Select>
  )
}
