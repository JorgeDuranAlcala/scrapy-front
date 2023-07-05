import TextField, { type TextFieldProps } from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const ControlledTextField = ({name, label, required, helperText, ...props}: Props) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()
  const { t } = useTranslation()

  const error = errors[name]?.message as string | undefined

  // Created this varible because passing the required prop to the TextField
  // caused the default HTML required input message to appear
  const noDefaultHTMLRequiredBehavior = required
  ? {
      inputProps: { required: false },
      required
    }
  : {}

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            value={value || ''}
            onBlur={onBlur}
            onChange={onChange}
            label={t(label)}
            error={Boolean(error)}
            helperText={error && (helperText || t(error as string, { field: label})) }
            {...props}
            { ...noDefaultHTMLRequiredBehavior }
          />
        )}
      />
    </FormControl>
  )
}

type Props = {
  name: string
  label: string
} & TextFieldProps

export default ControlledTextField
