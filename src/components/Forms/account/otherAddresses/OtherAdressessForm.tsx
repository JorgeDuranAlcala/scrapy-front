import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import { useFormContext, Control, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// ** Custom components
import {
  AddressForm,
  GenericForm1,
  defaultAddressForm,
  defaultGenericForm1,
  defaultGenericForm2,
  type GenericFormData1,
  type GenericFormData2
} from 'src/components/Forms'

import { WeekdaySelect } from '../../fields'


export const defaultOtherAddrForm: OtherAddrData = {
  ...defaultGenericForm1,
  ...defaultGenericForm2,
  ...defaultAddressForm,
  billingAlert: ''
}

export const OtherAdressesForm = () => {
  const { t } = useTranslation()
  const { control, formState: { errors}} = useFormContext()

  return (
      <Grid container spacing={5}>
        <AddressForm/>
        <GenericForm1 errors={errors} control={control as any as Control<GenericFormData1, any>} />

        <Grid item sm={12} md={4}>
        <WeekdaySelect/>
      </Grid>
      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='hours'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField value={value} onBlur={onBlur} onChange={onChange} label={t('hours')} sx={{ height: '100%' }} />
            )}
          />
        </FormControl>
      </Grid>

      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='billingAlert'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField value={value} onBlur={onBlur} onChange={onChange} label={t('billing-alert')} />
            )}
          />
        </FormControl>
      </Grid>
      </Grid>
  )
}

export type OtherAddrData =
  GenericFormData1 &
  Omit<GenericFormData2, 'tags'> &
  { billingAlert: string }
