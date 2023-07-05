import { useEffect } from 'react'

import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@mui/material/styles'

import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { selectFilled } from 'src/@core/styles/smallFilledSelect'
import { useAuth } from 'src/hooks'

const CLIENT_TYPES = ['business-client', 'particular-client']
const PROVIDER_TYPES = ['provider']

export const AccountTypeSelect = ({ newRecord = true }: Props) => {
  const { t } = useTranslation()
  const auth = useAuth()
  const {
    control,
    formState: { errors, isDirty },
    watch,
    setValue,
    clearErrors
  } = useFormContext()

  const [clientType, providerType] = watch(['clientType', 'providerType'])
  const isParticular = clientType === 'particular'
  const bothEmpty = clientType + providerType === '' && isDirty

  useEffect(() => {
    if (isParticular) setValue('providerType', '')

    if (!bothEmpty) clearErrors(['clientType', 'providerType'])
  }, [isParticular, bothEmpty])

  return (
    <Stack direction='column' alignItems='center' spacing={1}>
      <ThemeProvider theme={selectFilled}>
        <Stack direction='row' alignItems='center' justifyContent='center'>
          <FormControl error={errors.clientType !== undefined}>
            <Controller
              name='clientType'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  variant='filled'
                  {...field}
                  size='small'
                  sx={{ width: '180px' }}
                  disabled={
                    Boolean(auth.tenantUser && auth.tenantUser.userRole.specialRol === 'gestor')
                  }
                >
                  <MenuItem value=''>{t('none')}</MenuItem>
                  {CLIENT_TYPES.map(clientType => (
                    <MenuItem key={clientType} value={clientType}>
                      {t(clientType)}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          {!isParticular && (
            <FormControl error={errors.clientType !== undefined}>
              <Controller
                name='providerType'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select variant='filled' {...field} size='small' sx={{ width: '180px' }}>
                    <MenuItem value=''>{t('none')}</MenuItem>
                    {PROVIDER_TYPES.map(providerType => (
                      <MenuItem key={providerType} value={providerType}>
                        {t(providerType)}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          )}
        </Stack>
      </ThemeProvider>
      {bothEmpty && <FormHelperText sx={{ color: 'error.main' }}>{t('form-error.empty-select_other')}</FormHelperText>}
    </Stack>
  )
}

type Props = { newRecord?: boolean }

export type AccountType = {
  clientType: '' | 'business-client' | 'particular-client'
  providerType: '' | 'provider'
}

export const defaultAccountType = {
  clientType: '' as const,
  providerType: '' as const
}
