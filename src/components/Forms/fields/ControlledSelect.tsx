import { memo } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { type SelectProps } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { useFormContext, Controller } from 'react-hook-form'

type ControlledSelectProps = {
  name: string
  label: string
  options?: string[]
  allowEmpty?: boolean
} & Exclude<SelectProps, 'name' | 'label'>

const ControlledSelect = (props: ControlledSelectProps) => {
  const { name, label, allowEmpty= true, options = [], children } = props
  const {
    control,
    formState: { errors }
  } = useFormContext()

  const menuItems = options.map(option =>
    <MenuItem key={option} value={option}>{option}</MenuItem>
  )

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: {value, ...controlledProps} }) => (
        <FormControl fullWidth error={Boolean(errors[name])}>
          <InputLabel
            id={`${label}-label`}
            sx={{ color: errors.CNAE && 'error.main' }}
          >
            {label}
          </InputLabel>
          <Select
            value={value || ''}
            {...controlledProps}
            {...props}
            id={label}
            label={label}
            labelId='related-account-label'
          >
            {allowEmpty &&
              <MenuItem value={''}>Ninguno</MenuItem>
            }
            {children}
            {menuItems}
          </Select>
        </FormControl>
      )}
    />
  )
}

export default memo(ControlledSelect)
