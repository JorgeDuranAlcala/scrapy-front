import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import HelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import OutlinedInput from '@mui/material/OutlinedInput'
import Tooltip from '@mui/material/Tooltip'

import { useFormContext, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import Icon from 'src/@core/components/icon'
import { ControlledTextField, Currency, Country } from '../fields'

import { defaultBankForm } from '../Bank'

type TooltipLabelProps = {
  label: string
  title: string
}

const TooltipLabel = ({ label, title }: TooltipLabelProps) => {
  const { t } = useTranslation()
  return (
    <Box display='flex' gap={2}>
      <div>{`% ${t(label)}`}</div>
      <Tooltip placement='top' title={t(title)}>
        <IconButton sx={{ padding: 0 }}>
          <Icon icon='tabler:info-circle' />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export const defaultCommercialSpec = {
  paymentMethod: '',
  expiryDate: '',
  bankName: '',
  appliedDiscount: 'retail',
  specialDiscount: 0,
  commercialAgent: '',
  ...defaultBankForm
}

export type commercialSpecsData = typeof defaultCommercialSpec

const CommercialSpecsForm = ({ accountType }: CommercialSpecsProps) => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <Grid container spacing={5}>
      <Grid item sm={12} md={4}>
        <Controller
          name='paymentMethod'
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={Boolean(errors.paymentMethod)}>
              <InputLabel id='payment-method-label' sx={{ color: errors.paymentMethod && 'error.main' }}>
                {t('payment-method')}
              </InputLabel>
              <Select {...field} id='payment-method' label={t('payment-method')} labelId='payment-method-label'>
                <MenuItem value='bank-transfer'>{t('bank-transfer')}</MenuItem>
              </Select>
              {errors.paymentMethod && (
                <HelperText>{t(errors.paymentMethod.message as string, { field: 'payment-method' })}</HelperText>
              )}
            </FormControl>
          )}
        />
      </Grid>
      <Grid item sm={12} md={4}>
        <Controller
          name='expiryDate'
          control={control}
          render={({field}) => (
            <TextField
              fullWidth
              {...field}
              label={t('expiry-date_days')}
              error={Boolean(errors.expiryDate)}
              helperText={errors.expiryDate && t('form-error.positive-number')}
            />
          )}
        />
      </Grid>
      <Grid item sm={12} md={4}>
        <ControlledTextField name='IBAN' label='IBAN' />
      </Grid>
      <Grid item sm={12} md={3}>
        <ControlledTextField name='bankName' label='bank-name' />
      </Grid>
      <Grid item sm={12} md={3}>
        <Country />
      </Grid>
      <Grid item sm={12} md={2}>
        <Currency />
      </Grid>
      <Grid item sm={12} md={4}>
        <ControlledTextField name='SWIFT' label='SWIFT / BIC' />
      </Grid>
      {accountType === 'client' && (
        <>
          <Grid item sm={12} md={4}>
            <Controller
              name='appliedDiscount'
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.appliedDiscount)}>
                  <InputLabel id='applied-discount-label' sx={{ color: errors.appliedDiscount && 'error.main' }}>
                    <TooltipLabel label='applied-discount' title='applied-discount-tooltip' />
                  </InputLabel>
                  <Select
                    {...field}
                    id='applied-discount'
                    label={<TooltipLabel label='applied-discount' title='applied-discount-tooltip' />}
                    labelId='applied-discount-label'
                  >
                    <MenuItem value='retail'>{t('retail')}</MenuItem>
                    <MenuItem value='wholesaler'>{t('wholesaler')}</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <Controller
              name='specialDiscount'
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.specialDiscount)}>
                  <InputLabel>
                    <TooltipLabel label='special-discount' title='special-discount-tooltip' />
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    label={<TooltipLabel label='special-discount' title='special-discount-tooltip' />}
                    startAdornment={<InputAdornment position='start'>%</InputAdornment>}
                  />
                  {errors.specialDiscount && (
                    <HelperText>
                      {t('form-error.range' as string, {
                        field: 'special-discount',
                        max: 100,
                        min: 0
                      })}
                    </HelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <ControlledTextField name='commercialAgent' label={'commercial-agent'} />
          </Grid>
        </>
      )}
    </Grid>
  )
}

type CommercialSpecsProps = {
  accountType: string
}

export default CommercialSpecsForm
