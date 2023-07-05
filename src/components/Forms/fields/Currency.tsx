import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'

import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ACCEPTED_CURRENCIES } from 'src/schemas/BankSchema'

const Currency = () => {
  const { t } = useTranslation()
  const { control, formState: {errors} } = useFormContext()

  return (
    <FormControl fullWidth>
      <Controller
        name="currency"
        control={control}
        rules={{ required: true }}
        render={({ field: {onChange, ...rest} }) =>(
          <Autocomplete
            {...rest}
            onChange={(e, newValue: string) => {
              onChange(newValue)
            }}
            id="currency"
            options={ACCEPTED_CURRENCIES}
            renderInput={(params) =>
              <TextField
                {...params}
                label={t('currency')}
                error={Boolean(errors.currency)}
              />}
          />
        )}
      />
    </FormControl>
  )
}

export default Currency
