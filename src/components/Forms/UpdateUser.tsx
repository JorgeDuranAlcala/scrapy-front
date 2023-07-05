import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Stack from '@mui/material/Stack'

import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ControlledTextField, Password } from './fields'

export const defaultUpdateUserForm: UpdateUserCredentials = {
    email: '',
    currentPassword: '',
		newPassword: '',
		confirmPassword: ''
}

export const UpdateUserForm = () => {
  const { t } = useTranslation()
  const { reset} = useFormContext()

  return (
    <Stack spacing={5}>
      <InputLabel>{t('change-email')}</InputLabel>
      <Box sx={{ width: '50%' }}>
        <ControlledTextField name='email' label="email"/>
      </Box>
      <InputLabel>{t('change-password')}</InputLabel>
      <Box sx={{ width: '50%' }}>
        <Password
            name={'currentPassword'}
            label={'password-current'}
        />
      </Box>
      <Stack direction={{ sm: 'column', md: 'row' }}>
        <Password
            name={'newPassword'}
            label={'password-new'}
        />
        <Password
					name={'confirmPassword'}
					label={'password-confirm'}
					sx={{marginLeft: 5}}
				/>
      </Stack>

      <Box typography="body2">
      <Box>{t('password-requirements')}</Box>
        <ul>
            <li>{t('password-requirements.length')}</li>
            <li>{t('password-requirements.characters-case')}</li>
            <li>{t('password-requirements.special-characters')}</li>
        </ul>
      </Box>
      <Stack direction='row' spacing={3}>
        <Button type='submit' variant='contained'>
          {t('save')}
        </Button>
        <Button color='secondary' variant='outlined'
          onClick={() => reset(defaultUpdateUserForm)}
        >
          {t('reset')}
        </Button>
      </Stack>
    </Stack>
  )
}

export type UpdateUserCredentials = {
    email: string
    currentPassword: string
		newPassword: string
		confirmPassword: string
}
