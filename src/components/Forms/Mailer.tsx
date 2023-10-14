import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import { ControlledTextField, ControlledSelect, Password } from './fields'

import { MailerSchema } from 'src/schemas'

import { InferType } from 'yup'

export type MailerData = InferType<typeof MailerSchema>

export const Mailer = ({ isGettingData = false }: { isGettingData?: boolean }) => {
  return (
    <Stack gap={4}>
      <Typography>Datos servidor</Typography>
      <Grid container spacing={4}>
        <Grid item md={4} sm={12}>
          <ControlledSelect
            name='securityProtocol'
            label=''
            options={['TLS', 'SSL']}
            required
            disabled={isGettingData}
          />
        </Grid>
        <Grid item md={4} sm={12}>
          <ControlledTextField name='smtpHost' label='SMTP HOST' required disabled={isGettingData} />
        </Grid>
        <Grid item md={4} sm={12}>
          <ControlledTextField name='smtpPort' label='SMTP PORT' required disabled={isGettingData} />
        </Grid>
      </Grid>
      <Typography>Datos email</Typography>
      <Grid container spacing={4}>
        <Grid item md={6} sm={12}>
          <ControlledTextField name='email' label='Email' required disabled={isGettingData} />
        </Grid>
        <Grid item md={6} sm={12}>
          <Password name='password' label='password' required disabled={isGettingData} />
        </Grid>
      </Grid>
    </Stack>
  )
}
