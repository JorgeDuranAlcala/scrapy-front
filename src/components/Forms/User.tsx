import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import { Icon } from '@iconify/react'

// ** Third Party Imports
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ControlledTextField } from 'src/components/Forms'

export const defaultUserForm: UserFormData = {
  nameAndLastname: '',
  DNI: '',
  phone: '',
  email: '',
  role: 'manager',
  password: '',
  comments: ''
}

const Required = ({ text }: { text: string }) => {
  const { t } = useTranslation()

  return (
    <Stack direction='row'>
      {t(text)}
      <Box color='red' ml={2}>
        *
      </Box>
    </Stack>
  )
}

export const UserForm = () => {
  const { t } = useTranslation()
  const {
    formState: { errors },
    control
  } = useFormContext()

  return (
    <Stack sx={{ minWidth: 400, padding: 5 }} spacing={6}>
      <FormControl error={errors.role !== undefined} fullWidth>
        <InputLabel id='role-label' sx={{ color: errors.role && 'error.main' }}>
          {t('role')}
        </InputLabel>
        <Controller
          name='role'
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Select value={value || 'manager'} onChange={onChange} onBlur={onBlur} label={<Required text='role' />}>
              <MenuItem value='superAdmin'>{t('super-admin')}</MenuItem>
              <MenuItem value='manager'>{t('manager')}</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      <ControlledTextField name="nameAndLastname" label="name-and-lastName" required />
      <ControlledTextField name="DNI" label="DNI"/>
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

export type UserFormData = {
  role: string
  nameAndLastname: string
  DNI: string
  phone: string
  email: string
  password: string
  comments: string,
  status?: string
}
