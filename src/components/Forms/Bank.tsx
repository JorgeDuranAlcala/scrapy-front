// ** MUI Imports
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import { Controller, useFormContext } from 'react-hook-form'

import { Currency, Country } from 'src/components/Forms'

import type { Country as CountryData} from 'src/types'

export const defaultBankForm: BankFormData = {
  country: {
    id: 782,
    nameEn: "Spain",
    nameEs: "España",
    nameNative: "España"
  },
  currency: 'EUR',
  IBAN: '',
  SWIFT: ''
}

export const BankForm = () => {
  const { control, formState: {errors}} = useFormContext()

  return(
    <>
      <Country/>
      <FormControl fullWidth>
        <Currency />
      </FormControl>
      <FormControl fullWidth>
        <Controller
          name='IBAN'
          control = {control}
          rules = {{required: true}}
          render={({ field: {value, onChange, onBlur}}) =>(
            <TextField
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              label='IBAN'
              error={Boolean(errors.IBAN)}
              helperText={ errors.IBAN && "El campo IBAN no puede estar vacío" }
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth>
        <Controller
          name='SWIFT'
          control = {control}
          rules = {{required: true}}
          render={({ field: {value, onChange, onBlur}}) =>(
            <TextField
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              label='BIC / SWIFT'
              error={Boolean(errors.SWIFT)}
              helperText={ errors.SWIFT && "El campo SWIFT no puede estar vacío" }
            />
          )}
        />
      </FormControl>
    </>
  )
}

export type BankFormData = {
  country: CountryData | null
  currency: string
  IBAN: string
  SWIFT: string
}
