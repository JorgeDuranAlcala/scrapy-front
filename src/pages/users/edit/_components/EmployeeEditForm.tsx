// ** React Imports
import { useState, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

import Button, { ButtonProps } from '@mui/material/Button'
import { ThemeProvider } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

// ** Third Party Imports
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom hooks
import useBgColor from 'src/@core/hooks/useBgColor'

// ** Custom components
import { AddressForm, ControlledTextField, Currency } from 'src/components/Forms'

// ** Custom Theme
import stackTheme from 'src/@core/styles/stackTheme'

// ** Schemas
import { EmployeeSchema } from 'src/schemas'

interface Data {
  fullName: string
  dni: string
  address: string
  country: string
  province: string
  city: string
  email: string
  phone: number | string
  language: string
  timezone: string
  jobPosition: string
  postalCode: number | string
  currency: string
}

const initialData: Data = {
  fullName: '',
  dni: '',
  address: '',
  country: 'SPA',
  province: '',
  city: '',
  postalCode: '',
  email: '',
  phone: '',
  jobPosition: '',
  language: '',
  timezone: 'gmt-12',
  currency: 'EUR'
}

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(2)
  }
}))

const EmployeeEditForm = () => {
  const { t, i18n } = useTranslation()
  const { primaryLight } = useBgColor()

  // ** State
  const [inputValue, setInputValue] = useState('')
  const [imgSrc, setImgSrc] = useState('')

  // ** Form state hooks
  const userForm = useForm({
    defaultValues: {...initialData, language: i18n.language},
    mode: 'onBlur',
    resolver: yupResolver(EmployeeSchema)
  })
  const {
    formState: { errors }
  } = userForm

  const editEmployee = (data: Data) => {
    console.log(data, imgSrc)
  }

  const handleInputImageChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setInputValue(reader.result as string)
      }
    }
  }
  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('')
  }

  return (
    <Card>
      <CardHeader title={t('profile-details')} />
      <FormProvider {...userForm}>
        <form onSubmit={userForm.handleSubmit(editEmployee)}>
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {imgSrc !== '' ? (
                <ImgStyled src={imgSrc} alt='Profile Pic' />
              ) : (
                <Stack
                  justifyContent='center'
                  alignItems='center'
                  width={100}
                  height={100}
                  marginRight={6}
                  borderRadius='6px'
                  sx={primaryLight}
                >
                  <Icon icon='tabler:user' width={80} />
                </Stack>
              )}
              <div>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  {t('upload_context', { context: 'photo' })}
                  <input
                    hidden
                    type='file'
                    value={inputValue}
                    accept='image/png, image/jpeg'
                    onChange={handleInputImageChange}
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                  {t('reset')}
                </ResetButtonStyled>
                <Typography sx={{ mt: 4, color: 'text.disabled' }}>{t('image-upload-restrictions')}</Typography>
              </div>
            </Box>
          </CardContent>
          <Divider />
          <CardContent>
            <Stack spacing={5}>
              <ThemeProvider theme={stackTheme}>
                <Stack>
                  <ControlledTextField name='fullName' label='full-name' required />
                  <ControlledTextField name='dni' label='DNI' required />
                  <ControlledTextField name='jobPosition' label='job-title' required />
                </Stack>
                <AddressForm />
                <Stack>
                  <ControlledTextField name='phone' label='phone_one' />
                  <ControlledTextField name='email' label="email" />
                </Stack>
                <Stack>
                  <Controller
                    name='timezone'
                    rules={{ required: true }}
                    control={userForm.control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>{t('timezone')}</InputLabel>
                        <Select {...field} label={t('timezone')}>
                          <MenuItem value='gmt-12'>(GMT-12:00) International Date Line West</MenuItem>
                          <MenuItem value='gmt-11'>(GMT-11:00) Midway Island, Samoa</MenuItem>
                          <MenuItem value='gmt-10'>(GMT-10:00) Hawaii</MenuItem>
                          <MenuItem value='gmt-09'>(GMT-09:00) Alaska</MenuItem>
                          <MenuItem value='gmt-08'>(GMT-08:00) Pacific Time (US & Canada)</MenuItem>
                          <MenuItem value='gmt-08-baja'>(GMT-08:00) Tijuana, Baja California</MenuItem>
                          <MenuItem value='gmt-07'>(GMT-07:00) Chihuahua, La Paz, Mazatlan</MenuItem>
                          <MenuItem value='gmt-07-mt'>(GMT-07:00) Mountain Time (US & Canada)</MenuItem>
                          <MenuItem value='gmt-06'>(GMT-06:00) Central America</MenuItem>
                          <MenuItem value='gmt-06-ct'>(GMT-06:00) Central Time (US & Canada)</MenuItem>
                          <MenuItem value='gmt-06-mc'>(GMT-06:00) Guadalajara, Mexico City, Monterrey</MenuItem>
                          <MenuItem value='gmt-06-sk'>(GMT-06:00) Saskatchewan</MenuItem>
                          <MenuItem value='gmt-05'>(GMT-05:00) Bogota, Lima, Quito, Rio Branco</MenuItem>
                          <MenuItem value='gmt-05-et'>(GMT-05:00) Eastern Time (US & Canada)</MenuItem>
                          <MenuItem value='gmt-05-ind'>(GMT-05:00) Indiana (East)</MenuItem>
                          <MenuItem value='gmt-04'>(GMT-04:00) Atlantic Time (Canada)</MenuItem>
                          <MenuItem value='gmt-04-clp'>(GMT-04:00) Caracas, La Paz</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Currency />
                  <Controller
                    name='language'
                    rules={{ required: true }}
                    control={userForm.control}
                    render={({ field: { value, ...rest } }) => (
                      <FormControl fullWidth error={Boolean(errors.language)}>
                        <InputLabel sx={{ color: errors.country && 'error.main' }}>{t('language')}</InputLabel>
                        <Select value={value}
                          {...rest}
                        label={t('language')}
                        >
                          <MenuItem value='es'>{t('languages.spanish')}</MenuItem>
                          <MenuItem value='en'>{t('languages.english')}</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Stack>
              </ThemeProvider>
              <Stack direction='row'>
                <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                  {t('save')}
                </Button>
                <Button type='reset' variant='outlined' color='secondary' onClick={() => userForm.reset(initialData)}>
                  {t('reset')}
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </form>
      </FormProvider>
    </Card>
  )
}

export default EmployeeEditForm
