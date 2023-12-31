import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment'
import { Icon } from '@iconify/react'

import { InferType } from 'yup'

import { ControlledTextField } from 'src/components/Forms'
import { userSchema } from 'src/schemas'

export type UserFormData = InferType<typeof userSchema>

export const UserForm = () => {

  return (
    <Stack sx={{ minWidth: 400, padding: 5 }} spacing={6}>
      <ControlledTextField name="fullname" label="name-and-lastName" required />
      <ControlledTextField name="dni" label="DNI" transformValue={(value) => value.toLocaleUpperCase()}required/>
      <ControlledTextField name="job" label="Puesto de Trabajo"/>
      <ControlledTextField name="salary" label="Sueldo"/>
      <ControlledTextField name="payment_method" label="Forma de pago"/>
      <ControlledTextField name='phone' label='phone_one' />
      <ControlledTextField name='email' label='email_access' required />
      <ControlledTextField name='password' label='password_access' required />
      <ControlledTextField
        name='comments'
        label='comments'
        multiline
        rows={3}
        InputProps={{
          sx: { alignItems: 'start' },
          startAdornment: (
            <InputAdornment position='start'>
              <Icon width={20} icon='tabler:message' />
            </InputAdornment>
          )
        }}
      />
    </Stack>
  )
}
