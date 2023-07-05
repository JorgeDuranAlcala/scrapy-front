import {
  GenericForm1,
  defaultGenericForm1,
  type GenericFormData1,
  GenericForm2,
  defaultGenericForm2,
  type GenericFormData2
} from 'src/components/Forms/GenericForm'
import { GenericSchema2, GenericSchema1, AccountTypeSchema } from 'src/schemas'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import * as yup from 'yup'
import { Controller, Control, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// ** Components
import { defaultAccountType, type AccountType } from './AccountType'
import { AddressForm, defaultAddressForm } from "src/components/Forms"

// ** utils
import { cnaeInfo } from 'src/@core/utils/readExcel'

export const defaultCompanyForm: CompanyFormData = {
  fiscalName: '',
  commercialName: '',
  NIF: '',
  companyActivity: '',
  CNAE: '',
  represents: '',
  ...defaultGenericForm1,
  ...defaultGenericForm2,
  ...defaultAccountType,
  ...defaultAddressForm,
  clientType: '' as const,
  providerType: '' as const,
  operationType: '',
  operationField: '',
  equivSurcharge: ''
}

const dependantOnProviderType = yup.string().when('providerType', (providerType, schema) => {
  return providerType !== '' ? schema.min(1) : schema.optional()
})

export const companySchema = yup
  .object()
  .shape({
    fiscalName: yup.string().required(),
    commercialName: yup.string().required(),
    NIF: yup
      .string()
      .matches(/^[A-Z0-9]{9}$/)
      .required(),
    companyActivity: yup.string().ensure(),
    CNAE: yup.string().ensure(),
    represents: yup.string().required().ensure(),
    operationField: dependantOnProviderType,
    operationType: dependantOnProviderType,
    equivSurcharge: yup.string().oneOf(['active', 'inactive'])
  })
  .concat(GenericSchema1)
  .concat(GenericSchema2)
  .concat(AccountTypeSchema)

export const CompanyForm = ({ cnae }: CompanyFormProps) => {
  const {
    control,
    formState: { errors },
    watch
  } = useFormContext()
  const { t } = useTranslation()

  const providerType = watch('providerType')

  return (
    <Grid container spacing={5}>
      <Grid item sm={12} md={4}>
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
            name='commercialName'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('commercial-name_one')}
                error={Boolean(errors.commercialName)}
                helperText={errors.commercialName && 'El campo de nombre comercial no puede estar vacío'}
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
        <FormControl error={errors.CNAE !== undefined} fullWidth>
          <InputLabel id='equiv-surchr-label' sx={{ color: errors.equivSurcharge && 'error.main' }}>
            {t('equiv-surchrg')}
          </InputLabel>
          <Controller
            name='equivSurcharge'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id='equivSurchrg'
                labelId='equiv-surchr-label'
                label={t('equiv-surchrg')}
                error={Boolean(errors.equivSurcharge)}
              >
                <MenuItem value={"active"}>{t('activate')}</MenuItem>
                <MenuItem value={"inactive"}>{t('inactive')}</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Grid>

      <GenericForm2 errors={errors} control={control as any as Control<GenericFormData2, any>} />

      {providerType !== '' && (
        <>
          <Grid item sm={12} md={6}>
            <FormControl error={errors.operationField !== undefined} fullWidth>
              <InputLabel id='opField-label' sx={{ color: errors.operationField && 'error.main' }}>
                {t('operation-field')}
              </InputLabel>
              <Controller
                name='operationField'
                control={control}
                render={({ field: { value, ...rest } }) => (
                  <Select
                    value={value || ''}
                    {...rest}
                    id='opField'
                    labelId='opfield-label'
                    label={t('operation-field')}
                    error={Boolean(errors.operationField)}
                  >
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl error={errors.operationType !== undefined} fullWidth>
              <InputLabel id='opType-label' sx={{ color: errors.operationType && 'error.main' }}>
                {t('operation-type')}
              </InputLabel>
              <Controller
                name='operationType'
                control={control}
                render={({ field: { value, ...rest } }) => (
                  <Select
                    value={value || ''}
                    {...rest}
                    id='opType'
                    labelId='opType-label'
                    label={t('operation-type')}
                    error={Boolean(errors.operationType)}
                  >
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export type CompanyFormData = {
  fiscalName: string
  commercialName: string
  NIF: string
  companyActivity: '' | string
  CNAE: '' | string
  represents: string
  equivSurcharge: string
  operationField: string
  operationType: string
} & GenericFormData1 &
  GenericFormData2 &
  AccountType

type CompanyFormProps = {
  cnae: cnaeInfo[]
}
