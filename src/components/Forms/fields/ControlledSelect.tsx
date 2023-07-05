import { memo } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { type SelectProps } from '@mui/material/Select'

import { useFormContext, Controller } from 'react-hook-form'

type ControlledSelectProps = {
  name: string
  label: string
} & Exclude<SelectProps, 'name' | 'label'>

const ControlledSelect = (props: ControlledSelectProps) => {
  const { name, label, children } = props
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={Boolean(errors[name])}>
          <InputLabel
            id={`${label}-label`}
            sx={{ color: errors.CNAE && 'error.main' }}
          >
            {label}
          </InputLabel>
          <Select
            {...field}
            {...props}
            id={label}
            label={label}
            labelId='related-account-label'
          >
            {children}
          </Select>
        </FormControl>
      )}
    />
  )
}

export default memo(ControlledSelect)
