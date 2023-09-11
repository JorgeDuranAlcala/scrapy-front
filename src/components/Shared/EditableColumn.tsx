import { useState, useEffect, ChangeEvent } from "react"
import { GridRenderEditCellParams } from '@mui/x-data-grid'
import TextField from "@mui/material/TextField"
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from "@mui/material/Tooltip";

import Icon from 'src/@core/components/icon'

type EditableColumnProps = {
  msg?: string
} & GridRenderEditCellParams

// Custom edit component for DataGrid
export const EditableColumn = ({value, id, api, field, error, msg = ''}: EditableColumnProps) => {
  const [currentValue, setCurrentValue] = useState(value)

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setCurrentValue(newValue)
    api.setEditCellValue({id, field, value: newValue, debounceMs: 1000})
  }

  useEffect(() => {
    // Save changes when no changes have been made in 2 seconds
    if(value == currentValue)
      console.log("submit value: ", currentValue)
  }, [value])

  return (
      <TextField
        autoFocus
        fullWidth
        size="small"
        value={currentValue}
        onChange={handleValueChange}
        error={error}
        helperText={error && <Tooltip title={msg}><Icon icon="tabler:alert-circle"/></Tooltip>}
        InputProps={{
          endAdornment: value != currentValue && !error
          ? <InputAdornment position="end">
              <CircularProgress size={10}/>
            </InputAdornment>
          : undefined
        }}
      />
  )
}
