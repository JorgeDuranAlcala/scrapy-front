import {
  AddressForm,
  GenericForm1,
  defaultGenericForm1,
  defaultAddressForm,
  type GenericFormData1
} from 'src/components/Forms'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import { Control, Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// ** utils
import { cnaeInfo } from 'src/@core/utils/readExcel'

export const defaultTenantForm: TenantFormData = {
  fiscalName: '',
  NIF: '',
  companyActivity: '',
  CNAE: '',
  tags: '',
  observation: '',
  ...defaultGenericForm1,
  ...defaultAddressForm
}

export const TenantForm = ({ cnae }: CompanyFormProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()
  const { t } = useTranslation()

  return (
      <Grid container spacing={5}>
        <Grid item sm={12} md={8}>
          <FormControl fullWidth>
            <Controller
              name='fiscalName'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('fiscal-name')}
                  error={Boolean(errors.fiscalName)}
                  helperText={errors.fiscalName && 'El campo de nombre fiscal no puede estar vacío'}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item sm={12} md={4}>
          <FormControl fullWidth>
            <Controller
              name='NIF'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('NIF')}
                  error={Boolean(errors.NIF)}
                  helperText={errors.NIF && (errors.NIF.message as string)}
                />
              )}
            />
          </FormControl>
        </Grid>

        <AddressForm/>

        <GenericForm1 errors={errors} control={control as any as Control<GenericFormData1, any>} />

        <Grid item sm={12} md={4}>
          <FormControl error={errors.companyActivity !== undefined} fullWidth>
            <Controller
              name='companyActivity'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('business-activity')}
                  error={Boolean(errors.companyActivity)}
                  helperText={errors.companyActivity && (errors.companyActivity.message as string)}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item sm={12} md={4}>
          <FormControl error={errors.CNAE !== undefined} fullWidth>
            <InputLabel id='CNAE-label' sx={{ color: errors.CNAE && 'error.main' }}>
              CNAE
            </InputLabel>
            <Controller
              name='CNAE'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id='CNAE'
                  labelId='CNAE-label'
                  label='CNAE'
                  error={Boolean(errors.CNAE)}
                  MenuProps={{ MenuListProps: { sx: { overflowX: 'scroll' } } }}
                >
                  {cnae.map(({ CODINTEGR, TITULO_CNAE2009 }) => (
                    <MenuItem key={CODINTEGR} value={CODINTEGR}>{`${CODINTEGR} - ${TITULO_CNAE2009}`}</MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item sm={12} md={4}>
          <FormControl error={errors.companyActivity !== undefined} fullWidth>
            <Controller
              name='tags'
              control={control}
              render={({ field }) => <TextField {...field} label={t('tags')} />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} >
          <FormControl fullWidth>
            <Controller
              name='observation'
              control={control}
              render={({ field }) => <TextField {...field} multiline rows={4} label={t('observations')}></TextField>}
            />
          </FormControl>
        </Grid>
      </Grid>
  )
}

export type TenantFormData = {
  fiscalName: string
  NIF: string
  companyActivity: '' | string
  CNAE: '' | string
  tags?: string
  observation: ''
} & GenericFormData1

type CompanyFormProps = {
  cnae: cnaeInfo[]
}
