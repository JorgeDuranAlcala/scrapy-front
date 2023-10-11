import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { ControlledTextField } from './fields'

const RepeatPasswordForm = () => {
  return (
    <Stack direction='column' spacing={3} mb={3}>
      <ControlledTextField name='password' label='Contraseña' type='password' required />
      <ControlledTextField name='repeatPassword' label='Repetir contraseña' type='password' required />
      <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
        Guardar nueva contraseña
      </Button>
    </Stack>
  )
}

export default RepeatPasswordForm
