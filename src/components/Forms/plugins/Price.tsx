import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'

import { useFormContext, Controller } from 'react-hook-form'

export const defaultPriceForm = {
  price: '',
  VAT: ''
}

export const PluginPricing = () => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <>
      <Stack direction='row' spacing={5}>
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
      </Stack>
      <Box mt={5}>
        <Button variant='contained' type='submit'>
          {t('save')}
        </Button>
      </Box>
    </>
  )
}

export type PriceFormData = {
  price: string
  VAT: string
}
