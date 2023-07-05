import { useState, useEffect, ChangeEvent } from "react"
import { GridRenderEditCellParams } from '@mui/x-data-grid'
import OutlinedInput from "@mui/material/OutlinedInput"
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';

export const DescriptionColumn = ({value, id, api, field, row}: GridRenderEditCellParams) => {
  const [currentValue, setCurrentValue] = useState(value)
  const fileID = row.id

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setCurrentValue(newValue)
    api.setEditCellValue({id, field, value: newValue, debounceMs: 2000})
  }

  useEffect(() => {
    // Save changes when no changes have been made in 2 seconds
    if(value === currentValue)
      console.log("submit value: ", currentValue)
  }, [value])

  return (
      <OutlinedInput
        autoFocus
        fullWidth
        size="small"
        value={currentValue}
        onChange={handleValueChange}
        endAdornment={ value !== currentValue
          ? <InputAdornment position="end">
              <CircularProgress size={20}/>
            </InputAdornment>
          : undefined
        }
      />
  )
}
