import { Icon } from '@iconify/react'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const defaultContactForm: ContactsFormData = {
  nameAndLastName: '',
  phone: '',
  emailNotifications: []
}

export const ContactForm = ({ control, errors }: ContactFormProps) => {

  const { t } = useTranslation()

  return (
    <>
      <Stack>
        <FormControl fullWidth required>
          <Controller
            name='nameAndLastName'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                fullWidth
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label={t('name-and-lastname')}
                error={Boolean(errors.nameAndLastName)}
                helperText={errors.nameAndLastName && 'Nombre y apellidos no puede estar vacio'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon width={20} icon='carbon:user' />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='DNI'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label='DNI'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon width={20} icon='mdi:clipboard-user' />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='jobTitle'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField value={value} onBlur={onBlur} onChange={onChange} label={t('job-title')} />
            )}
          />
        </FormControl>
      </Stack>
      <Stack>
        <FormControl fullWidth required>
          <Controller
            name='phone'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label={t('phone_one')}
                error={Boolean(errors.phone)}
                helperText={errors.phone && errors.phone.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon width={20} icon='carbon:phone' />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label='Email'
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon width={20} icon='carbon:email' />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </FormControl>
        <FormControl error={errors.emailNotifications !== undefined} fullWidth>
          <InputLabel id='emailNotifications-label' sx={{ color: errors.emailNotifications && 'error.main' }}>
            {t('email-notifications')}
          </InputLabel>
          <Controller
            name='emailNotifications'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                multiple
                id='emailNotifications'
                value={value}
                labelId='emailNotifications-label'
                label={t('email-notifications')}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(errors.emailNotifications)}
              >
                <MenuItem value='1'>1</MenuItem>
                <MenuItem value='2'>2</MenuItem>
                <MenuItem value='3'>3</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Stack>
    </>
  )
}

export type ContactsFormData = {
  nameAndLastName: string
  DNI?: string
  phone: string
  email?: string
  jobTitle?: string
  emailNotifications?: string[]
  comments?: string
}

type ContactFormProps = {
  control: Control<ContactsFormData, any>
  errors: Partial<FieldErrors<ContactsFormData>>
}
