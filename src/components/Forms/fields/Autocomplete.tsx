import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import MUIAutocomplete from '@mui/material/Autocomplete'

import { useFormContext, Controller } from 'react-hook-form'

type AutocompleteProps = {
  options: unknown[]
  name: string
  label: string
  loading: boolean
  error: boolean
  isOptionEqualToValue: (option: any, value: any) => any
  onInputChange?: (str: string) => void
  inputValue?: string
}

const Autocomplete = ({ name, inputValue, label, loading, error, options, isOptionEqualToValue, onInputChange}: AutocompleteProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...rest } }) => (
          <MUIAutocomplete
            {...rest}
            loading={loading}
            value={value}
            options={options || []}
            onChange={(event, newValue) => {
              onChange(newValue || null)
            }}
            loadingText="Cargando..."
            inputValue={inputValue}
            onInputChange={(_, newValue) => {onInputChange && onInputChange(newValue)}}
            getOptionLabel={option => option.name || ''}
            isOptionEqualToValue={isOptionEqualToValue}
            noOptionsText={error ? 'Error de busqueda, intente de nuevo' : 'Sin resultados'}
            renderInput={params => (
              <TextField
                {...params}
                label={label}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'off' // disable autocomplete and autofill
                }}
                error={Boolean(errors[name])}
                helperText={errors[name] && 'Selecciona una poblacion'}
              />
            )}
          />
        )}
      />
    </FormControl>
  )
}

export default Autocomplete
