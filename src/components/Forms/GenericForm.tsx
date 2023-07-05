import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { WeekdaySelect } from './fields'

import { AddressFormData, defaultAddressForm } from './Address'

export const defaultGenericForm1: GenericFormData1 = {
  contactPerson: '',
  phone: '',
  email: '',
  ...defaultAddressForm
}

export const defaultGenericForm2: GenericFormData2 = {
  daysOpened: [],
  hours: '',
  tags: ''
}

export const GenericForm1 = ({ control, errors }: GenericFormProps1) => {
  const { t } = useTranslation()

  return (
    <>
      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='contactPerson'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label={t('contact-person')}
                error={Boolean(errors.contactPerson)}
                helperText={errors.contactPerson && 'El campo de Persona contacto no puede estar vacío'}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='phone'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label={t('phone_one')}
                error={Boolean(errors.phone)}
                helperText={errors.phone && errors.phone.message}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='email'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label='Email'
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
              />
            )}
          />
        </FormControl>
      </Grid>
    </>
  )
}

export const GenericForm2 = ({ control, errors }: GenericFormProps2) => {
  const { t } = useTranslation()

  return (
    <>
      <Grid item sm={12} md={4}>
        <WeekdaySelect/>
      </Grid>
      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='hours'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField value={value} onBlur={onBlur} onChange={onChange} label={t('hours')} sx={{ height: '100%' }} />
            )}
          />
        </FormControl>
      </Grid>

      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='tags'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField value={value} onBlur={onBlur} onChange={onChange} label='Tags' />
            )}
          />
        </FormControl>
      </Grid>
    </>
  )
}

export type GenericFormData1 = {
  contactPerson?: string
  phone?: string
  email?: string
} & AddressFormData

export type GenericFormData2 = {
  daysOpened: number[]
  hours: string
  tags?: string
}

type GenericErrors = {
  errors: Partial<FieldErrors<GenericFormData1 & GenericFormData2>>
}

export type GenericFormProps1 = {
  control: Control<GenericFormData1, any>
} & GenericErrors

export type GenericFormProps2 = {
  control: Control<GenericFormData2, any>
} & GenericErrors
