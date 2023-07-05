import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'

import { ControlledTextField, ControlledSelect } from '../fields'

import { useTranslation } from 'react-i18next'

export const defaultLedgAcc = {
  ledgerAccount: '',
  name: '',
  accItem: '',
  relatedAcc: '',
  amortization: 0
}

export type LedgerAccountFormData = typeof defaultLedgAcc

export const LedgerAccountForm = () => {
  const { t } = useTranslation()

  return (
    <Stack gap={5}>
      <Box typography='h6' mb={3}>{t('ledger-account')}</Box>
      <ControlledTextField required name='ledgerAccount' label={t('ledger-account')} />
      <ControlledTextField required name='name' label={t('name')} />
      <ControlledSelect name='accItem' label={t('accounting-item')}>
        <MenuItem value='D'>D</MenuItem>
      </ControlledSelect>
      <ControlledSelect name='relatedAcc' label={t('related-account')}>
        <MenuItem value='test'>Placeholder</MenuItem>
      </ControlledSelect>
      <ControlledTextField name='amortization' label={t('amortization')}
        helperText={t('form-error.range', {field: 'amortization', min:0, max:100})}
        InputProps={{
          startAdornment:
            <InputAdornment position='start'>
              %
            </InputAdornment>
        }}
      />
    </Stack>
  )
}

