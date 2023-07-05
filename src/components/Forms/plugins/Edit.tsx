import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import HelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const defaultEditPluginForm: EditPluginFormData = {
  name: '',
  ledgerAccount: '',
  description: ''
}

export const EditPluginForm = () => {
  const { t } = useTranslation()
  const {
    formState: { errors },
    control
  } = useFormContext()

  return (
    <Stack direction="column">
      <Stack>
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
                helperText={errors.name && t(errors.name.message as string, {field: 'name'})}
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
                <Select
                  value={value || ''}
                  {...rest }
                  label={t('ledger-account')}
                  labelId='ledger-account-label'>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                </Select>
                <HelperText>
                  {errors.ledgerAccount &&
                    t(errors.ledgerAccount.message as string, {field: 'ledger-account' })
                  }
                </HelperText>
              </>
            )}
          />
        </FormControl>
      </Stack>
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
              multiline
              rows={6}
            />
          )}
        />
      </FormControl>
    <div>
      <Button variant="contained" type="submit">{t('save')}</Button>
    </div>
    </Stack>
  )
}

export type EditPluginFormData = {
  name: string
  ledgerAccount: string
  description: string
}
