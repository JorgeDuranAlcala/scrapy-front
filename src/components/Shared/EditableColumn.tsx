import { useState, ChangeEvent } from "react"
import { GridRenderEditCellParams, GridEditInputCell } from '@mui/x-data-grid'
import TextField from "@mui/material/Input"
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

  return (
      <TextField
        autoFocus
        fullWidth
        size="small"
        value={currentValue}
        onChange={handleValueChange}
        error={error}
        sx={{paddingBottom: 0, fontSize: 'inherit'}}
        inputProps={{style: {paddingBottom: 0, paddingTop: 0}}}
        disableUnderline
        endAdornment={ error
          ? <Tooltip title={msg}><Icon width={24} icon="tabler:alert-circle"/></Tooltip>
          : undefined
        }
      />
  )
}
