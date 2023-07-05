import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"

import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { ControlledTextField } from "src/components/Forms"

export const defaultCardForm: CardData = {
  name: '',
  number: '',
  expDate: '',
  cvv: ''
}

export const CardForm = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext()
  const { t } = useTranslation()

  const formatDate = (date: string) => {
    if (`${date}/`.match(/^\d{2}\//)) return `${date.slice(0, 2)}/${date.slice(3, 7)}`

    return date
  }

  return (
    <>
      <ControlledTextField name="name" label={"name"}/>
      <ControlledTextField name="number" label={"number"}/>
      <FormControl fullWidth error={Boolean(errors.expDate)}>
        <Controller
          name='expDate'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              placeholder='MM/AA'
              value={value}
              onBlur={onBlur}
              onChange={e => onChange(formatDate(e.target.value))}
              label={t('expiration-date')}
              error={Boolean(errors.expDate)}
              helperText={errors.expDate && 'El fecha de expiracion tarjeta no es válida'}
            />
          )}
        />
      </FormControl>
      <ControlledTextField name="cvv" label="CVV"/>
    </>
  )
}

export type CardData = {
  name: string
  number: string
  expDate: string
  cvv: string
}
