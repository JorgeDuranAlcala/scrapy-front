import { useContext } from 'react'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import HelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from "@mui/material/InputAdornment"

import Icon from "src/@core/components/icon"

// ** Third Party Imports
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// ** Custom components
import { defaultPriceForm } from './Price'

// ** Context
import { ModalContext } from 'src/context'

export const defaultNewPluginForm: NewPluginFormData = {
  name: '',
  ledgerAccount: '',
  description: '',
  ...defaultPriceForm
}

export const NewPluginForm = () => {
  const { t } = useTranslation()
  const {
    formState: { errors },
    control,
    reset
  } = useFormContext()

  const [, {close}] = useContext(ModalContext)

  return (
    <Stack spacing={6}>
      <FormControl fullWidth>
        <Controller
          name='name'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              value={value || ''}
              onBlur={onBlur}
              onChange={onChange}
              label={t('name')}
              error={Boolean(errors.name)}
              helperText={errors.name && t(errors.name.message as string, { field: 'name' })}
            />
          )}
        />
      </FormControl>
      <FormControl error={errors.ledgerAccount !== undefined} fullWidth>
        <InputLabel id='ledger-account-label' sx={{ color: errors.ledgerAccount && 'error.main' }}>
          {t('ledger-account')}
        </InputLabel>
        <Controller
          name='ledgerAccount'
          control={control}
          render={({ field: { value, ...rest } }) => (
            <>
              <Select value={value || ''} {...rest} label={t('ledger-account')} labelId='ledger-account-label'>
                <MenuItem value='1'>1</MenuItem>
                <MenuItem value='2'>2</MenuItem>
                <MenuItem value='3'>3</MenuItem>
              </Select>
              <HelperText>
                {errors.ledgerAccount && t(errors.ledgerAccount.message as string, { field: 'ledger-account' })}
              </HelperText>
            </>
          )}
        />
      </FormControl>
      <FormControl fullWidth>
        <Controller
          name='price'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('price')}
              error={Boolean(errors.price)}
              helperText={errors.price && t(`${errors.price.message}`, { field: 'price', min: 0.99 })}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth>
        <Controller
          name='VAT'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label={`${t('VAT')}`}
              error={Boolean(errors.VAT)}
              helperText={errors.VAT && t(`${errors.VAT.message}`, { field: 'VAT', min: 0.99 })}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth>
        <Controller
          name='description'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, ...rest } }) => (
            <TextField
              value={value || ''}
              {...rest}
              label={t('product_description')}
              multiline rows={6}
              InputProps={{
                sx: { alignItems: 'start' },
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon width={20} icon='tabler:message' />
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </FormControl>
      <Stack direction="row" spacing={5} justifyContent="space-between">
        <Button variant='contained' type='submit'>
          {t('save')}
        </Button>
        <Button variant='outlined' color="secondary"
          onClick={() => {
            reset(defaultNewPluginForm)
            close()
          }}
        >
          {t('cancel')}
        </Button>
      </Stack>
    </Stack>
  )
}

export type NewPluginFormData = {
  name: string
  ledgerAccount: string
  description: string
}
