import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { ControlledTextField } from './fields'

const ForgotPasswordForm = () => {
  return (
    <Stack direction='column' spacing={3} mb={3}>
      <ControlledTextField name='email' label='Email' type='email' required />
      <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
        Enviar enlace para restablecer
      </Button>
    </Stack>
  )
}

export default ForgotPasswordForm
